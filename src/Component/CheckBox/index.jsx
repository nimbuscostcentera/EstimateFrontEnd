import React from 'react'

function CheckBox({Label,onChange}) {
  return (
    <div className="flex-wrap mx-2 mt-1">
      <label className="text-label">
        <input
          type="checkbox"
          placeholder="Show Password"
          onChange={onChange}
        />
        &nbsp;{Label}
      </label>
    </div>
  );
}

export default CheckBox