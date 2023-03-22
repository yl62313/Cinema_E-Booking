import React from 'react'
import { Modal, Form, Row, Col } from 'antd'
import Button from '../../../Button'
import moment from "moment";

function MovieForm ({
    showMovieFormModal,
    setShowMovieFormModal,
    selectedMovie,
    setSelectedMovie,
    formType,
    setFormType
}) {

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
            <Form layout='vertical'>
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
                        <Form.Item label="Genre" name="Genre">
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
                        <Form.Item label="Movie scheduling" name="schedul">
                            <input type="date" />
                            </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Poster URL" name="poster">
                            <input type="text"/>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Promotion" name="promotion">
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