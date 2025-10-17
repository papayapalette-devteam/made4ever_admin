import React, { useState ,useRef, useEffect} from 'react';
import {
  Box, Grid, Button, Typography, Card, Avatar,
  TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup,
  FormControlLabel, Radio, Fade,Chip,Menu,Paper 
} from '@mui/material';
import {  IconButton,  Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import api from '../../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../loader';
import { DataGrid } from '@mui/x-data-grid';
import Adminsidebar from '../adminsidebar';
import Adminheader from '../adminheader';



function EducationSpecialization() {

  const[loading,setloading]=useState(false)
     const [Education_Specialization, setEducation_Specialization] = useState({
      education_specialization: "",
  });



      const[all_allergy_master,setall_allergy_master]=useState([])
      const getall_allergy_master=async()=>
      {
        try {
            const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"allergy_master"})
          console.log(resp);
          
          setall_allergy_master(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_allergy_master()
    
      },[])

      const [menuAnchor, setMenuAnchor] = useState(null);
      const [menuRowId, setMenuRowId] = useState(null);
      
      const handleOpenMenuhospital = (event, rowId) => {
        setMenuAnchor(event.currentTarget);
        setMenuRowId(rowId);
      };
      
      const handleCloseMenuhospital = () => {
        setMenuAnchor(null);
        setMenuRowId(null);
      };

    const[lookup_id,setlookup_id]=useState(null)
     const onEdit=(row)=>
     {
        setlookup_id(row._id)
        setEducation_Specialization({
         allergy_category:row.parent_lookup_id,
         allergy_name:row.lookup_value,
         allergic_symptoms:row.other.allergic_symptoms
       })
     }

  const onDeletehospital=()=>
  {
    alert("delete")
  }

     const column = [
        { field: 'sno', headerName: 'S.No.', flex: 0.2,renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1},
        { field: 'lookup_value', headerName: 'Education Specialization', flex: 0.5 },
       {
      field: 'actions',
      headerName: 'Actions',
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={(e) => handleOpenMenuhospital(e, params.row._id)}>
            <MoreVertIcon />
          </IconButton>
    
          {menuRowId === params.row._id && (
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleCloseMenuhospital}
              disableScrollLock
            >
              <MenuItem
                onClick={() => {
                  onEdit(params.row);
                  handleCloseMenuhospital();
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onDeletehospital(params.row._id);
                  handleCloseMenuhospital();
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          )}
        </>
      ),
    }
    
      ];
    
      const rows = all_allergy_master?.map((doc, index) => ({
        id: doc._id || index,
        ...doc,
      }));




    //========================================= get salt type id ================================================

  const[allergy_category,setallergy_category]=useState([])
      const get_allergy_category=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"allergy_category_type"})
          setallergy_category(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        get_allergy_category()
    
      },[])




   


    const handlechange = (e) => {
  const { name, value, checked, type } = e.target;

  setEducation_Specialization((prev) => {
    if (Array.isArray(value)) {
      return { ...prev, [name]: value };
    }

    if (Array.isArray(prev[name])) {
      const updated = checked
        ? [...prev[name], value] // Add
        : prev[name].filter((item) => item !== value); // Remove
      return { ...prev, [name]: updated };
    }

    if (type === "checkbox" && Array.isArray(prev[name])) {
      const updated = checked
        ? [...prev[name], value] // Add to array
        : prev[name].filter((item) => item !== value); // Remove from array
      return { ...prev, [name]: updated };
    }

    if (type === "checkbox") {
      return { ...prev, [name]: checked };
    }

    // Normal single-value field
    return { ...prev, [name]: type === "checkbox" ? checked : value };
  });
};


     
        const add_allergy_master = async () => {
        try {
          setloading(true)
          const resp = await api.post("api/v1/admin/SaveLookup",
            {
              lookup_id:lookup_id,
              lookup_type:"education_specialization",
              lookup_value:Education_Specialization.education_specialization,
            }
          );
      
          if (resp.data.response.response_code === "200") {
              Swal.fire({
                      icon:"success",
                      title:"Allergy Master Added",
                      text:"Allergy Master Addedd Successfully...",
                      showConfirmButton:true,
                       customClass: {
                      confirmButton: 'my-swal-button',
                    },
                    }).then(()=>
                    {
                      window.location.reload()
                    })
            console.log("✅ Lookup list:", resp.data.data);
          } else {
            console.warn("⚠️ Error:", resp.data.response.response_message);
              Swal.fire({
                      icon:"error",
                      title:"Error Occured",
                      text:resp.data.response.response_message,
                      showConfirmButton:true,
                       customClass: {
                      confirmButton: 'my-swal-button',
                    }
                }
                )
          }
        } catch (error) {
          console.error("❌ API Error:", error);
        }
        finally
        {
          setloading(false)
        }
      };

 
      

  return (
    <div>
 <Adminheader />

      <div className="layout">
        <Adminsidebar />
        <div className="content-wrapper">
          <div className="main-content">

        <div className='profile-header'>
                  <h3>Enter Details for Education Specialization Master</h3>
                  <p>Add or update the required details for the education specialization master to keep records accurate and complete.</p>
                  </div>
        
        
           {/* Form */}
                  <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
      <div className="form-grid">
          

  
       <FormControl fullWidth size="small">
             <label className="form-label">Education Specialization</label>
            <TextField 
              name="education_specialization"
              defaultValue={Education_Specialization.education_specialization}
              onChange={handlechange}
              placeholder='Education Specialization'
            >

            </TextField>
          </FormControl> 

        
          

          
         </div>

          <Button
         className='submit-button'
            onClick={add_allergy_master}
          >
            Submit
          </Button>
        </Paper>
        
        
      {/* Table */}
               <Paper elevation={3} sx={{ p: 2, borderRadius: 2,marginTop:4 }}> 
                                              
              <DataGrid
               className="custom-data-grid"
                rows={rows}
                columns={column}
                pageSize={10}
                pageSizeOptions={[]} // removes the rows per page selector
                initialState={{
                  pagination: { paginationModel: { pageSize: 10, page: 0 } },
                }}
                disableSelectionOnClick
              
              />
              </Paper>
     
          </div>
      </div>
      </div>

           {loading && (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(255, 255, 255, 0.6)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <UniqueLoader />
  </div>
)}

    </div>
  )
}

export default EducationSpecialization
