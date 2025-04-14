import { useState, useRef, useEffect } from "react"


function RegistrationForm() {

  const letters = "abcdefghijklmnopqrstuvwxyz"; 
  const numbers = "0123456789"; 
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";


  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");

  const fullNameRef = useRef();
  const specializationRef = useRef();
  const experienceRef = useRef();
  const formRef = useRef();

  useEffect(() => {
    fullNameRef.current.focus();
  }, []);


  

  const handleSubmit = (e) => {
    e.preventDefault();

    const defaultData = {
      fullName: fullNameRef.current.value,
      userName: userName,
      password: password,
      specialization: specializationRef.current,
      experience:  experienceRef.current,
      description: description
    }
  

    // Validazione dei dati
    if (!fullNameRef ||
      !userName ||
      !password ||
      !specializationRef ||
      !experienceRef ||
      !description
    ) {
      alert("Tutti i campi sono obbligatori");
      return;
    } 
    if (experienceRef.current.value < 0) {
      alert("Gli anni di esperienza non possono essere negativi");
      return;
    }
    console.log("Dati del form:", defaultData);
    
  }

  //RESET
  const handleReset = () => {
    setUserName("");
    setPassword("");
    setDescription("");
    fullNameRef.current.value = "";
    specializationRef.current.value = "";
    experienceRef.current.value = "";
  }

  // VALIDAZIONI IN TEMPO REALE

  const isValidUserName = userName.length >= 6 &&
    [...userName].every((char) => letters.includes(char) || numbers.includes(char));


  const errorMessageUserName = isValidUserName ? "Username valido" : "Lo username deve essere lungo almeno 6 caratteri e può contenere solo lettere e numeri";


  const isValidPassword = password.length >= 8 &&
    [...password].some((char) => letters.includes(char)) &&
    [...password].some((char) => numbers.includes(char)) &&
    [...password].some((char) => symbols.includes(char));
  
  const errorMessagePassword = isValidPassword ? "Password valida" : "La password deve essere lunga almeno 8 caratteri e deve contenere almeno una lettera, un numero e un simbolo";

  const isValidDescription = description.trim().length >= 100 && description.trim().length <= 1000; 
  const errorMessageDescription = isValidDescription ? "Descrizione valida" : "La descrizione deve essere lunga tra 100 e 1000 caratteri";


  return (
    <form ref= {formRef} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName">Nome completo</label>
        <input type="text" id="fullName" name="fullName" ref={fullNameRef} />
      </div>

      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="userName" value={userName} onChange={e => setUserName(e.target.value)} />
        <p style={ {color: isValidUserName ? "green" : "red"}}>{errorMessageUserName}</p>
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
        <p style={ {color: isValidPassword ? "green" : "red"}}>{errorMessagePassword}</p>
      </div>

      <div>
        <label htmlFor="specialization">Specializzazione</label>
        <select id="specialization" name="specialization" ref={specializationRef}>
          <option value="">Seleziona una specializzazione</option>
          <option value="fullstack">Full Stack</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
      </div>

      <div>
        <label htmlFor="experience">Anni di esperienza</label>
        <input type="number" id="experience" name="experience" min="0" ref={experienceRef}/>
      </div>

      <div>
        <label htmlFor="description">Breve descrizione</label>
        <textarea id="description" name="description" rows="4" value={description} onChange={e => setDescription(e.target.value)}></textarea>
        <p style={ {color: isValidDescription ? "green" : "red"}}>{errorMessageDescription}</p>
      </div>

      <button type="submit">Registrati</button>
      <button type="reset" onClick={handleReset}>Reset</button>
      <button 
  className="scroll-to-top" 
  type="button" 
  onClick={() => formRef.current.scrollIntoView({ behavior: 'smooth' })}
>
  ⬆
</button>
    </form>
  )
}

export default RegistrationForm