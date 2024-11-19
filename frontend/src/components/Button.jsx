import React from "react"

const Button = ({ label, icon, clickAction }) => {
  return (
    <button
      onClick={clickAction}
      className="flex items-center bg-violet-500 px-4 py-2 rounded-md text-xl"
    >
      {label} {icon && icon}
    </button>
  )
}

export default Button
