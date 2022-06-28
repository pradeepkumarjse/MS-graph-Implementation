import React, { useState } from "react";
import { Select } from "antd";

export default function AntdMeeting() {
  const { Option } = Select;
  const [uemail, setUemail] = useState([""]);
  const Email=
  [ {"user_email":"addrsta@gmail.com"},{"user_email":"djs@gmail.com"},{"user_email":"kk@gmail.com"},{"user_email":"ewe@gmail.com"}
];

console.log("<><><><><><><>"+JSON.stringify(uemail))

  return (
    <div style={{"text-align":"center"}}>
      <label for="exampleDataList"
                    style={{ marginBottom: "-2%" }}
                    class="form-label">Allendee</label>
      <Select
        mode="tags"
        onChange={(e) => setUemail(e)}
        // defaultValue={uemail}
        className="mt-3 addform"
        style={{
          width: "100%",
          color: "rgba(0, 0, 0, 0.54)",
        }}
      >
         {Email.map((Email) => (
                        <Option
                          style={{ color: "black" }}
                          value={Email.user_email}
                        >
                          {Email.user_email}
                        </Option>
                      ))}
      </Select>
      <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br />
    </div>
  );
}
