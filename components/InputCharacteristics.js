import { useEffect, useState } from "react"
import { fetchApi, queries } from "../utils/Fetching"
import { useField } from "formik";
import { AppContextProvider } from "../context/AppContext";
import { GiBookPile } from "react-icons/gi"
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai"
import { MdOutlineAddCircleOutline } from "react-icons/md"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { CreaAndEditCharacteristics } from "./CreaAndEditCharacteristics"
import { useToast } from "../hooks/useToast";


export const InputCharacteristics = ({ params, props }) => {
  const toast = useToast();
  const { stage, setStage } = AppContextProvider()
  const [field, meta, helpers] = useField(props);
  const [showAdd, setShowAdd] = useState({ status: false, payload: {} })

  useEffect(() => {
    helpers.setValue(stage?.payload?.characteristics)
  }, [stage?.payload])

  const handleDelete = async (elem) => {
    try {
      await fetchApi({
        query: queries.updateCharacteristics,
        variables: {
          args: { elementID: stage.payload._id, ...elem, status: false },
        },
        type: "json"
      }).then(data => {
        const f1 = stage?.payload?.characteristics?.findIndex(elem => elem?._id === data?._id)
        stage?.payload?.characteristics?.splice(f1, 1)
        setStage({ ...stage })
        toast("success", "característica eliminada")
      })
      setShowAdd(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full">
      <div className="w-full text-gray-700 capitalize grid grid-cols-12 items-center text-left font-semibold border-b-2 py-1">
        <span className="col-span-4">Nombre</span>
        <span className="col-span-4">Descripción</span>
        <span className="col-span-3">coordinación</span>
      </div>
      {typeof field?.value === "object" && field?.value?.map((elem, idx) => {
        return (
          <div key={idx} className="w-full">
            < div className={`w-full ${(showAdd.status && showAdd?.payload?._id === elem._id) && "bg-gray-200"} text-gray-700 uppercase grid grid-cols-12 gap-4 items-center py-1`}>
              <div className="col-span-4 gap-2 flex items-center">
                <GiBookPile className="w-5 h-5" />
                <span className="truncate">{elem?.title}</span>
              </div>
              <span className="col-span-4 truncate">{elem?.description}</span>
              <span className="col-span-3 truncate">{elem?.coordination}</span>
              <div className="col-span-1 gap-2 flex items-center">
                <AiTwotoneEdit
                  onClick={() => {
                    (showAdd.status && showAdd?.payload?._id === elem._id)
                      ? setShowAdd({ status: false })
                      : setShowAdd({ status: true, payload: elem })
                  }}
                  className="w-5 h-5 cursor-pointer" />
                <AiTwotoneDelete
                  onClick={() => { handleDelete(elem) }}
                  className="w-5 h-5 cursor-pointer" />
              </div>
            </div>
            {(showAdd.status && showAdd?.payload?._id === elem._id) &&
              <div className="border-2 border-t-0 rounded-b-xl pb-4 mb-4">
                <CreaAndEditCharacteristics params={elem} setShowAdd={setShowAdd} />
              </div>
            }
          </div>
        )
      })}
      <div className="w-full text-gray-700 uppercase grid grid-cols-12 gap-4 items-center border-t-2 py-1">
        <div className="col-span-12 gap-2 flex items-center cursor-pointer ml-10" onClick={() => { setShowAdd({ status: showAdd?.payload ? true : !showAdd?.status }) }}>
          {showAdd?.status && !showAdd?.payload ? <IoIosArrowUp className="w-4 h-4" /> : <IoIosArrowDown className="w-4 h-4" />}
          <span className="">agregar característica</span>
          <MdOutlineAddCircleOutline className="w-5 h-5" />
        </div>
      </div>
      {(showAdd?.status && !showAdd?.payload) &&
        <CreaAndEditCharacteristics setShowAdd={setShowAdd} />
      }
    </div>
  )
}

