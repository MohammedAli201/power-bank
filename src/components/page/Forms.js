import DisplayOptions from "./DisplayOptions";
import DisplayResults from "./DisplayResults";

import React,{useState} from "react";

const Forms = () => {

    const [formData, setFormData] = useState(null);


    const handleFormSubmit = (data) => {
        setFormData(data);
      };
    


    return (
        <div>
        <DisplayOptions onClick={handleFormSubmit} />
        {formData && <DisplayResults formData={formData} />}
      </div>
    )
}

export default Forms;