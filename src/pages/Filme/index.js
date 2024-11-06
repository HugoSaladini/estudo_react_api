import { useEffect, useState } from 'react'
import { useParams, useNavigate, json } from 'react-router-dom'
import api from '../../services/api';
import './filme.css'
import {toast} from 'react-toastify'

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate(true);

    const [filme, setFilmes] = useState({});
    const [loading, setLoading] = useState (true);
    

    const formattedVoteAverage = parseFloat(filme.vote_average).toFixed(1);


    useEffect(()=>{
        async function loadFilmes(params) {
            await api.get(`/movie/${id}`,  {
                params:{
                    api_key: '6065036b550e5c3188be6d6ddb9b4340',
                    language: 'pt-BR'
                }
            })
            .then((response)=>{
                setFilmes(response.data);
                setLoading(false);
            })
            .catch((responsee)=>{
                console.log('FILME NAO ENCONTRADO')
                navigate('/', {replace: true});
            })
        }



        loadFilmes();


        return () => {
            console.log('COMPONENTE DESCOMTADO');
        }
    }, [navigate,id])

    function salvarfilme(){
        const minhalista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhalista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id)

        if(hasFilme) {
            toast.warn("Este filme já está na sua Lista")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme Salvo com Sucesso!")
    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>
                    Carregando detalhes...
                </h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1> 
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse:</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {formattedVoteAverage} / 10.0</strong>

            <div className='area-buttons'>
                <button onClick={salvarfilme}>Salvar</button>
                <button>
                    <a target='blank' rel='external' href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    )
}

export default Filme;