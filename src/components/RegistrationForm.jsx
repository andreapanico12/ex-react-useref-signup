import { useState } from "react"


function RegistrationForm() {

  const defaultData = {fullName: "",
    userName: "",
    password: "",
    specialization: "",
    experience: "",
    description: ""
  }

  const [formData, setFormData] = useState(defaultData);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData ((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validazione dei dati
    if (!formData.fullName ||
      !formData.userName ||
      !formData.password ||
      !formData.specialization ||
      !formData.experience ||
      !formData.description
    ) {
      alert("Tutti i campi sono obbligatori");
      return;
    } 
    if (formData.experience < 0) {
      alert("Gli anni di esperienza non possono essere negativi");
      return;
    }
    console.log("Dati del form:" ,formData);
    setFormData(defaultData)
  }





  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName">Nome completo</label>
        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="userName" value={formData.userName} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="specialization">Specializzazione</label>
        <select id="specialization" name="specialization" value={formData.specialisation} onChange={handleChange}>
          <option value="">Seleziona una specializzazione</option>
          <option value="fullstack">Full Stack</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
      </div>

      <div>
        <label htmlFor="experience">Anni di esperienza</label>
        <input type="number" id="experience" name="experience" min="0" value={formData.experience} onChange={handleChange}/>
      </div>

      <div>
        <label htmlFor="description">Breve descrizione</label>
        <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange}></textarea>
      </div>

      <button type="submit">Registrati</button>
    </form>
  )
}

export default RegistrationForm