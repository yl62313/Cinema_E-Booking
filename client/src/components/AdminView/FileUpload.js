import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import Icon from '@ant-design/icons';
import axios from 'axios';


function FileUpload(props) {

    const [Images, setImages] = useState([])

    const dropHandler = (files) => {

        let formData = new FormData()

        const config = {
            header: { 'content-type': 'multipart/fomr-data' }
        }
        formData.append("file", files[0])
        //axios사용해서 frontend와 백엔드 연결하고 파일저장
        axios.post('/api/movie/image', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...Images, response.data.filePath])
                    props.refreshFunction([...Images, response.data.filePath])


                } else {
                    alert('fail to save ')
                }
            })
    }


    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image);
        let newImages = [...Images]
        newImages.splice(currentIndex, 1)
        setImages(newImages)
        props.refreshFunction(newImages)


    }


    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={dropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <div
                        style={{
                            width: 300, height: 240, border: '1px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />
                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                {Images.map((image, index) => (
                    <div onClick={() => deleteHandler(image)} key={index}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={`http://localhost:3000/${image}`}
                            alt="img"
                        />
                    </div>
                ))}

            </div>


        </div>
    )
}

export default FileUpload