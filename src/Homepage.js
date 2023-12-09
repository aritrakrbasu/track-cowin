import React from 'react'
import { Container, Form, Row, Button, Col, Spinner } from 'react-bootstrap';
import illustration from './img/illustration.png'
import SelectSearch,{ fuzzySearch } from 'react-select-search';
import { useEffect, useRef, useState } from 'react';
import { arrayval, db} from './firebase';

function Homepage() {

    const [districtList, setDistrictList] = useState([])
    const [stateList, setStateList] = useState([])
    const [selectedDistrict, setselectedDistrict] = useState([])
    const [selectedState, setselectedState] = useState(null)
    const [error, setError] = useState()
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
  
    const nameRef =useRef()
    const emailRef =useRef()
    const pincodeRef =useRef()
    
  
    function getDistrictList(option)
    {
      setselectedState(option)
      const url =`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${option}`
      var processed =0 
      var districtlist=[]
        fetch(url , {
          "method":"GET",
        })
          .then(res =>res.json())
          .then (list =>{
            list.districts.forEach((district,index)=>{
              processed++
              districtlist.push({name:district.district_name,value:district.district_id})
              if(processed === list.districts.length )
              {
                setDistrictList(districtlist)
              }
            })
          })
      }
  
      function handleSubmit(e)
      {
          e.preventDefault()
          setLoading(true)
          setSuccess(false)
          setError("")
          if(selectedState ==  null)
            {
              setError("Please Select your State")
              setLoading(false)
              return
            }
          if(selectedDistrict ==  null)
            {
              setError("Please Select your District")
              setLoading(false)
              return
            }
          db.collection("userData").doc("userData").update({
            list: arrayval.arrayUnion({
                name:nameRef.current.value,
                email:emailRef.current.value,
                district:selectedDistrict,
                state:selectedState,
                pincode:pincodeRef.current.value
            })
            
          }).then(()=>{
  
            setSuccess(true)
            setLoading(false)
          })
          .catch((error)=>{
            setError(error.message)
            setLoading(false)
          })
      }
  
      useEffect(() => {
        const url =`https://cdn-api.co-vin.in/api/v2/admin/location/states`
        var processed = 0 
        var states=[]
          fetch(url , {
            "method":"GET",
          })
            .then(res =>res.json())
            .then (list =>{
              list.states.forEach((state)=>{
                processed++
                states.push({name:state.state_name,value:state.state_id})
                if(processed === list.states.length )
                {
                  setStateList(states)
                }
              })
            })
      }, [])
  
  
    return (
        <Container>
     <Row>
        <Col lg={{span:6,order:2}} md={{span:6,order:2}} className="d-flex flex-column align-items-center">
          <img src={illustration} className="img-fluid illustration" alt="" />
        </Col>
        <Col lg={{span:6,order:1}} md={{span:6,order:2}} className="d-flex flex-column align-items-center justify-content-center" >
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Your Name" ref={nameRef} required />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={emailRef} required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Label>State</Form.Label>
          {stateList !== null &&(
              <SelectSearch 
              options={stateList} 
              search
              filterOptions={fuzzySearch}  
              name="district" 
              placeholder="Choose your State"
              onChange={(val)=>getDistrictList(val)}
              autoComplete="off"
              required
              />
          )}
          
          <Form.Label>District</Form.Label>
          <SelectSearch 
          options={districtList} 
          search
          filterOptions={fuzzySearch}  
          name="district" 
          placeholder="Choose your District"
          autoComplete="off"
          disabled={!(districtList.length>0)}
          onChange={(val)=>setselectedDistrict(val)}
          required
          />
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Pincode </Form.Label>
            <Form.Control type="text" placeholder="pincode" ref={pincodeRef}/>
            <Form.Text className="text-muted">Leave it blank to get update of your district .</Form.Text>
          </Form.Group>
          <Button disabled={loading} variant="primary" type="submit" className="w-100">
            {loading ? (<Spinner animation="border" />):("Send Me updates")}
          </Button>
          {error && <div class="error">{error}</div>}
          {success && <div class="success">Congrats !! Now we will let you know once their is a availability . Don't forget to check your spam. </div>}
        </Form>
        </Col>
        
     </Row>
     <div className="col-lg-12 notify">Note: This websites sends you an automated email whenever their is a availability of vaccine in your area . We use COWIN Api and is not atall an official website for covid vaccine registration . You can book your appointment for covid vaccine by registering at <a href="https://www.cowin.gov.in/home" target="_blank" rel="noreferrer noopener">COWIN</a></div>
   </Container>
    )
}

export default Homepage
