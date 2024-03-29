import { useEffect, useState } from "react"
import { InputSelectNew } from "./InputsProperty/InputSelectNew"
import { fetchApi, queries } from "../utils/Fetching"
import { Formik, useField, useFormikContext } from "formik";
import { AppContextProvider } from "../context/AppContext";
import { InputField } from "./InputField";
import { RiBarChart2Fill } from "react-icons/ri"
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai"
import { MdOutlineAddCircleOutline } from "react-icons/md"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { InputRadioGroup } from "./InputsProperty/InputRadioGroup"
import { InputCron } from "./InputsProperty/InputCron"
import { InputDateTime } from "./InputsProperty/InputDateTime"
import { schemaCoordinations } from "../utils/schemaCoordinations.js"
import * as yup from 'yup'
import { InputNew } from "./InputsProperty/InputNew";
import { TextareaNew } from "./InputsProperty/TextareaNew";
import { ButtonBasic } from "./ButtonBasic";
import { FaCheck } from "react-icons/fa"
import { useToast } from '../hooks/useToast';
import { InputSwitch } from "./InputsProperty/InputSwitch"
import { optionsIntervals } from '../utils/dictionaries.js'


export const CreaAndEditProperties = ({ father, params, setShowAdd, setDataComponenentes }) => {
  const toast = useToast()
  const d = new Date()
  const { stage, setStage, setData } = AppContextProvider()
  const [values, setValues] = useState()
  const [errors, setErrors] = useState()

  const [initialValues, setInitialValues] = useState({
    execution: "periódica",
    medition: "",
    coordination: "",
    title: "",
    description: "",
    executedAt: new Date(`${d.getFullYear()}-${(d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1}-${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()},08:00`),
    periodic: undefined,
    unique: new Date(`${d.getFullYear()}-${(d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1}-${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()},08:00`),
    executor: "",
    active: true
  })

  const validationSchema = yup.object().shape({
    medition: yup.string().test((value) => !!value),
    coordination: yup.string().test((value) => !!value),
    title: yup.string().test((value) => !!value),
    executor: yup.string().test((value) => !!value),
    description: yup.string().test((value) => !!value),
  });

  const handleSubmit = async () => {
    try {
      if (Object.keys(errors).length === 0) {
        if (!params) {
          const data = await fetchApi({
            query: queries.createProperties,
            variables: {
              args: {
                elementID: father?._id ? father?._id : stage?.payload?._id,
                ...values
              },
            },
            type: "json"
          })
          if (!setDataComponenentes) {
            stage?.payload?.properties?.push(data?.results[0])
            setStage({ ...stage })
          }
          if (setDataComponenentes) {
            setDataComponenentes(old => {
              const f1 = old?.data?.findIndex(elem => elem?._id === father?._id)
              old?.data[f1]?.properties?.push(data?.results[0])
              return { ...old }
            })
          }
          setShowAdd({ status: false })

        }



        if (params) {
          delete values?.father
          const data = await fetchApi({
            query: queries.updateProperties,
            variables: {
              args: { elementID: father?._id ? father?._id : stage?.payload?._id, ...values },
            },
            type: "json"
          })
          if (!setDataComponenentes) {
            const f1 = stage?.payload?.properties?.findIndex(elem => elem?._id === data?._id)
            stage?.payload?.properties?.splice(f1, 1, data)
            setStage({ ...stage })
          }
          if (setDataComponenentes) {
            setDataComponenentes(old => {
              const f1 = old?.data?.findIndex(elem => elem?._id === father?._id)
              const f2 = old.data[f1].properties.findIndex(elem => elem._id === data?._id)
              old.data[f1].properties.splice(f2, 1, data)
              return { ...old }
            })
          }
          setShowAdd({ status: false, payload: data })
        }



        toast("success", "propiedad guardada")
        return
      }
      toast("error", "faltan campos requeridos");
    } catch (error) {
      console.log(error)
    }
  }

  const meditionOptions = [
    {
      value: "cualitativa", label: "Cualitativa",
    },
    {
      value: "cuantitativa", label: "Cuantitativa",
    },
    {
      value: "no aplica", label: "No aplica",
    }
  ]

  return (

    <Formik
      initialValues={params ? params : initialValues}
      validationSchema={validationSchema}

    >
      {({ resetForm }) => {

        return (
          <div className='w-full grid grid-cols-6 gap-2 *border-[1px] *border-gray-300 *rounded-lg px-4'>
            <AutoSubmitToken setErrors={setErrors} setValues={setValues} />
            <div className="col-span-2">
              <InputRadioGroup name={"execution"} label="ejecución" />
            </div>
            <div className="col-span-2">
              <InputSelectNew name={"medition"} label="medición" options={meditionOptions} />
            </div>
            <div className="col-span-2">
              <InputSelectNew name={"coordination"} label="coordinacion" options={schemaCoordinations?.map((elem) => { return { value: elem.title, label: elem.title } })} />
            </div>
            <div className="col-span-4">
              <InputNew name="title" label="nombre" />
            </div>
            <div className="col-span-2">
              <InputSelectNew name={"executor"} label="responsable" options={schemaCoordinations?.find((elem) => elem?.title == values?.coordination)?.workers?.map(elem => { return { value: elem, label: elem } })} />
            </div>
            <div className="col-span-6">
              <TextareaNew name="description" label="descripción" />
            </div>
            {values?.execution === "periódica" &&
              <div className="col-span-3">
                <InputDateTime name="executedAt" label="última ejecución" />
              </div>
            }
            <div className={`${values?.execution === "periódica" ? "col-span-2" : "col-span-5"}`}>
              {values?.execution === "periódica"
                ? <InputSelectNew name={"periodic"} label="intérvalo ejecución" options={optionsIntervals} />
                : <InputDateTime name="unique" label="ejecución única" />}
            </div>
            <div className="col-span-1">
              <InputSwitch name="active" label="activo" />
            </div>
            <div className="col-span-6 flex justify-end items-end">
              <ButtonBasic
                className={`m-4 bg-green-500 hover:bg-green-600 w-48 h-8 text-sm`}
                onClick={handleSubmit}
                caption={
                  <div className="flex gap-2 text-sm">Guardar propiedad<FaCheck className="w-5 h-5" /></div>
                }
              />
            </div>
          </div>
        )
      }}
    </Formik>
  )
}

const AutoSubmitToken = ({ setErrors, setValues }) => {
  const { values, errors, setValues: setValueFormik } = useFormikContext();
  const [valir, setValir] = useState(false)

  useEffect(() => {
    setErrors(errors)
  }, [errors]);

  useEffect(() => {
    setValues(values)
  }, [values]);

  useEffect(() => {
    if (valir) {
      setValueFormik({ ...values, executor: "" })
    }
    setValir(true)
  }, [values?.coordination]);

  return null;
};