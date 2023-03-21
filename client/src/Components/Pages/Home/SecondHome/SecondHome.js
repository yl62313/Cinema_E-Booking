import React from 'react'
import {useNavigate} from "react-router-dom"
import { Row,Col } from "antd";
import sample1 from '../../../../samplePicture/Minions-The-Rise-of-Gru.jpg'
import sample2 from '../../../../samplePicture/Screenshot 2023-02-19 at 2.43.46 PM.png'
import sample3 from '../../../../samplePicture/Screenshot 2023-02-19 at 2.45.09 PM.png'
import sample4 from '../../../../samplePicture/Screenshot 2023-02-19 at 2.45.31 PM.png'




function SecondHome() {
  const navigate = useNavigate()

  return (
    <div>
      <div className='flex justify-end'>
      {/*Search movie */}
      <input type={"text"}
      className="searchbar"
      placeholder="Search"
      />
      </div>
      {/*list movie from database*/}

      {/*Sample Img*/}
      <Row gutter={[16,16]} className="mt-2">
        <Col span={6}>
            <div className='card flex flex-col gap-1 cursor-pointer'
            onClick={()=> navigate(`/movie`)}
            >
            <img src={sample1} alt="" height={200}/>
            <div className='flex justify-center gap-1 p-2'>
              <h1 className="text-md uppercase">
                {"minion1"}
              </h1>
            </div>
            </div>
        </Col>
        <Col span={6}>
            <div className='card flex flex-col gap-1 cursor-pointer'
            onClick={()=> navigate(`/movie`)}
            >
            <img src={sample2} alt="" height={200}/>
            <div className='flex justify-center gap-1 p-2'>
              <h1 className="text-md uppercase">
                {"minion2"}
              </h1>
            </div>
            </div>
        </Col>
        <Col span={6}>
            <div className='card flex flex-col gap-1 cursor-pointer'
            onClick={()=> navigate(`/movie`)}
            >
            <img src={sample3} alt="" height={200}/>
            <div className='flex justify-center gap-1 p-2'>
              <h1 className="text-md uppercase">
                {"minion3"}
              </h1>
            </div>
            </div>
        </Col>
        <Col span={6}>
            <div className='card flex flex-col gap-1 cursor-pointer'
            onClick={()=> navigate(`/movie`)}
            >
            <img src={sample4} alt="" height={200}/>
            <div className='flex justify-center gap-1 p-2'>
              <h1 className="text-md uppercase">
                {"minion4"}
              </h1>
            </div>
            </div>
        </Col>
      </Row>
    </div>
  )
}

export default SecondHome