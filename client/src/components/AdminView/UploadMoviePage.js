import React, { useState }  from 'react'
import { Form, Input } from 'antd';
import Auth from '../../hoc/auth'
import FileUpload from './FileUpload';
import axios from 'axios';

const { TextArea } = Input;

const Continents = [
    { key: 1, value: "Action" },
    { key: 2, value: "Animation" },
    { key: 3, value: "Comedy" },
    { key: 4, value: "Drama" },
    { key: 5, value: "Romance" },
    { key: 6, value: "Fantasy" },
    { key: 7, value: "Thriller" }
]


function UploadMoviePage(props) {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }


    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!Title || !Description || !Price || !Continent || Images.length === 0) {
            return alert("fill out everything")
        }


        //Send the values to request.

        const body = {
            //The ID of the logged in person
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent
        }

        axios.post('/api/movie', body)
            .then(response => {
                if (response.data.success) {
                    alert('upload.')
                    props.history.push('/')
                } else {
                    alert('fail.')
                }
            })
    }

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2> Movie Upload </h2>
        </div>
        <Form onSubmit={submitHandler}>
        <FileUpload refreshFunction={updateImages} />
        <br />
                <br />
                <label>Movie Name</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>Description</label>
                <TextArea onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                <label>Price($)</label>
                <Input type="number" onChange={priceChangeHandler} value={Price} />
                <br />
                <br />
                <select onChange={continentChangeHandler} value={Continent}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}> {item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <button type="submit">
                    submit
                </button>



        </Form>


    </div>
  )
}

export default Auth(UploadMoviePage, null)