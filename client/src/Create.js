import React, {useState} from 'react';
import axios from 'axios';
import Header from './Components/Header';
import { getUser, getToken } from './helpers';


const Create = () => {
  
// State
   const [state, setState] = useState({
      title: '',
      content: '',
      date: '',
      grade: '',
      user: getUser()
   })

// Destruct value from state
const {title, content, date, grade, user} = state;

// OnChange
const handleChange = (name) => (event) => {
   setState({...state, [name]: event.target.value})
}

// OnSubmit
const handleSubmit = event => {
   axios.post(`${process.env.REACT_APP_API}/post`, {title, content, date, grade, user}, 
   {
      headers: {
         authorization: `Bearer ${getToken()}`
      }
   })
   .then(response => {
     setState({...state,  title: '', content: '', date: '', grade: '', user: ''});
     alert('Inlägget skapades')
   })
   .catch(error => {
      
      alert(error.response.data.error);
   })
}

  return (
   <div>
      <Header />
    <div className="container p-5">
        <h1>Skapa inlägg</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
         <label className="text-muted">Rubrik</label>
         <input onChange={handleChange('title')} value={title} type="text" className="form-control" placeholder="Rubrik" required />
        </div>
        <div className="form-group">
         <label className="text-muted">Innehåll</label>
         <textarea onChange={handleChange('content')} value={content} className="form-control" placeholder="Innehåll" required />
        </div>
        <div className="form-group">
         <label className="text-muted">Datum</label>
         <input onChange={handleChange('date')} value={date} type="date" className="form-control" placeholder="Datum" required />
        </div>
        <div className="form-group">
        <label className="text-muted">Betyg från ett till fem</label>
        <input onChange={handleChange('grade')} value={grade} type="number" className="form-control" placeholder="Betyg" min="1" max="5" required />
      </div>
      <div className="form-group">
        <label className="text-muted">Användare</label>
        <input onChange={handleChange('user')} value={user} type="text" className="form-control" placeholder="Ditt namn" required />
      </div>

      <button className="btn btn-primary">Skapa inlägg</button>
        
      
        </form>
    </div>
    </div>
  )
};

export default Create;