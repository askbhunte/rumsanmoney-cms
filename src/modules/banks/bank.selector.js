import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";

import { listAllBank } from "../../services/banks";

export default function ({ onChange }) {
  const [bankList, setBankList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await listAllBank();
      setBankList(res);
    }
    fetchData();
  }, []);

  return (
    <div className="form-item">
      <label htmlFor="name">Banks</label>
      <br />
      <Input
        name="bank_id"
        type="select"
        className="form-field"
        onChange={onChange}
        required
      >
        <option value="">-- Select Bank --</option>
        {bankList.length ? (
          bankList.map((d) => {
            return (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            );
          })
        ) : (
          <option value="">-- Add Bank First --</option>
        )}
      </Input>
    </div>
  );
}
