import { useEffect, useState } from "react"
import { InputSelect } from "./InputSelect"
import { fetchApi, queries } from "../utils/Fetching"
import { useField } from "formik";
import { AppContextProvider } from "../context/AppContext";

export const InputDoubleSelect = ({ params, props }) => {
  const { stage, setData, itemSchema } = AppContextProvider()
  const [field, meta, helpers] = useField(props);
  const [value, setValue] = useState(params?.options?.find(elem => elem?.value === field?.value?.typeElement))
  const [optiosSecondSelect, setOptiosSecondSelect] = useState()
  const [secondValue, setSecondValue] = useState(optiosSecondSelect?.find(elem => elem?.value === field?.value?._id))
  const [valir, setValir] = useState(false)

  useEffect(() => {
    if (value?.value) {
      fetchApi({
        query: queries.getElements,
        variables: {
          args: { typeElement: value?.value },
          sort: {},
          limit: 0,
          skip: 0,
        },
        type: "json"
      }).then(result => {
        const opt = result?.results?.map(elem => {
          return { value: elem?._id, label: elem.title }
        })
        setOptiosSecondSelect(opt)
        if (valir) {
          setSecondValue([])
        }
        if (!valir) {
          setSecondValue(opt?.find(elem => elem?.value === field?.value?._id))
          setValir(true)
        }
      })
    }
    if (!value?.value) {
      setOptiosSecondSelect(undefined)
      setSecondValue([])
    }
  }, [value])

  const onChangeHandler = async (secondValue) => {
    setSecondValue(secondValue)
    const newValue = {
      title: secondValue?.label,
      typeElement: value?.value,
      _id: secondValue?.value
    }
    helpers.setValue(newValue)
    if (stage?.payload) {
      console.log(stage, field?.name)
      setData((old) => {
        old.results.splice(stage.dataIndex, 1, { ...old.results[stage.dataIndex], [field?.name]: newValue })
        return { ...old, results: old.results }
      })
      await fetchApi({
        query: itemSchema.updateEntry,
        variables: {
          args: {
            _id: stage.payload._id,
            [field?.name]: newValue?._id,
          },
        },
        type: "json"
      })
      console.log("actualizazo registro en InputDoubledSelect", newValue)
      return
    }
    console.log("actualizazo registro en InputDoubledSelect")
  }

  return (
    <div className='w-full flex gap-2'>
      <div className='w-[34%]'>
        <InputSelect
          value={value}
          options={params?.options}
          onChange={setValue}
        />
      </div>
      <div className='w-[66%]'>
        <InputSelect
          value={secondValue}
          options={optiosSecondSelect}
          onChange={onChangeHandler}
        />
      </div>
    </div>

  )
}