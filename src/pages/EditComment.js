import { useParams , useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Style.css"

export function EditComment(){
    const params = useParams();
    var infoFilme = params.filme
    

    const [form, setForm] = useState({
        filme:{infoFilme},
		comentario: "",
		userName: ""
    });

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchMovieDetails() {
          try {
            const response = await axios.get(
              `https://ironrest.herokuapp.com/apiDICKvigarista/${params.id}`
            );
            setForm({ ...response.data });
          } catch (error) {
            console.error(error);
          }
        }
    
        fetchMovieDetails();
    }, []);

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }
    
    function handleSubmit(event) {
        event.preventDefault();
    
        for (let key in form) {
            if (!form[key]) {
                window.alert(`Gentileza preencher o campo ${key} corretamente`);
                return;
            }
        }
    
        delete form._id;
        axios
        .put(`https://ironrest.herokuapp.com/apiDICKvigarista/${params.id}`, form)
        .then((result) => console.log(result))
        .catch((error) => {
        console.error(error);
        });
        navigate(`/${infoFilme}`)
    }

    return(
    <div className="comentCreation">
      <div className="comentBox">
        <form onSubmit={handleSubmit}>
          <label className="label" htmlFor="userName">Nome de Usuário:</label>
          <input
            id="UserName"
            name="userName"
            value={form.userName}
            onChange={handleChange}
          />
          <label className="label" htmlFor="comment">Novo comentário:</label>
          <textarea 
            cols="20" 
            rows="5"
            id="comment"
            name="comentario"
            value={form.comentario}
            onChange={handleChange}
          />
          <button type="submit">Cadastrar comentário editado</button>
        </form>
      </div>
    </div>
    )
}