import React from 'react'
import { Modal, Form, Row, Col, message } from 'antd'
import Button from '../../../Button'
import moment from "moment";
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../reducers/loader_reducer';
import { AddMovie } from '../../../../action/movies';

function MovieForm ({
    showMovieFormModal,
    setShowMovieFormModal,
    selectedMovie,
    setSelectedMovie,
    formType
}) {


    const dispatch = useDispatch();
    const onFinish = async(values) => {
        
        try{
            dispatch(ShowLoading())
            let response = null;
            if (formType === "add"){
                response = await AddMovie(values);
            }else{

            }
            if(response.success){
                message.success(response.message);
                setShowMovieFormModal(false);
            }
            else{
                message.error(response.message);
            }
            dispatch(HideLoading());
        }catch(error){
            dispatch(HideLoading());
            message.error(error.message);
        }
    }


    if (selectedMovie) {
        selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format(
          "YYYY-MM-DD"
        );
    }


  return (
    <Modal
        title={formType === 'add' ? "Add Movie" : 'Edit Movie'}
        open={showMovieFormModal}
        onCancel={()=> { setShowMovieFormModal(false); setSelectedMovie(null);}}
            footer={null}
            width={700}
        >
            <Form layout='vertical' onFinish={onFinish} initialValues={selectedMovie}>
                <Row
                gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Movie Name" name="title">
                            <input type="text"/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Description" name="description">
                            <textarea type="text"/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Movie Duration" name="duration">
                            <input type="text"/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Genre" name="genre">
                            <select name="" id="">
                                <option value="">Select Genre</option>
                                <option value="Action">Action</option>
                                <option value="Animation">Animation</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Drama">Drama</option>
                                <option value="Romance">Romance</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Thriller">Thriller</option>
                            </select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Movie scheduling" name="schedule">
                            <input type="date" />
                            </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Poster URL" name="poster">
                            <input type="text"/>
                        </Form.Item>
                    </Col>
                </Row>
                <div className='flex justify-end gap-1'>
                    <Button title='Cancel' type='button'
                    onClick={()=>{
                        setShowMovieFormModal(false)
                        setSelectedMovie(null)
                    }}
                    />
                    <Button title='Save' type='submit'/>
                </div>
            </Form>
    </Modal>
  )
}

export default MovieForm