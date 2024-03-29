import { useField } from "formik";
import { useEffect, useRef, useState } from "react";

export const Textarea = ({ value, meta, setValue }, props) => {
  const refInput = useRef()

  const handleChange = (e) => {
    e.target.rows = 1
    let rowT = (refInput?.current.scrollHeight - 16) / 20
    if (rowT < 9) {
      e.target.rows = rowT
    }
    else {
      e.target.rows = 8
    }
    setValue(e.target.value)
  }

  useEffect(() => {
    if (!value) {
      refInput.current.rows = 1
    }
  }, [value])


  return (
    <>
      <div>
        <label className="capitalize text-xs">{props?.label}</label>
        {meta?.error && <span className="text-red-500 text-xs ml-2">!requerido</span>}
      </div>
      <textarea
        style={{ resize: 'none' }}
        rows={
          refInput?.current
            ? (refInput?.current.scrollHeight - 16) / 20 < 9
              ? (refInput?.current.scrollHeight - 16) / 20
              : 8
            : 1
        }
        ref={refInput}
        type="text" value={value}
        onChange={(e) => { handleChange(e) }}
        className={`rounded-lg border-[1px] border-gray-300 text-sm w-[100%] overflow-y-scroll`} />
    </>
  )
}