import React, { useState ,useRef, useEffect} from 'react';
import {
  Box, Grid, Button, Typography, Card, Avatar,
  TextField, FormControl, InputLabel, Select, MenuItem, Paper,
  FormControlLabel, Radio, Fade,Chip,Menu,InputAdornment 
} from '@mui/material';
import {  IconButton,  Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import api from '../../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../loader';
import { DataGrid } from '@mui/x-data-grid';
import Adminsidebar from '../adminsidebar';
import Adminheader from '../adminheader';



function DiseaseMaster() {

  const[loading,setloading]=useState(false)
     const [disease_master, setdisease_master] = useState({
    medical_speciality_id: null,
    disease_name: "",
    icd_10_code: "",
    icd_11_code:"",
    description:""

  });



      const[all_disease_master,setall_disease_master]=useState([])
      const getall_disease_master=async()=>
      {
        try {
            const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"disease_master"})
          console.log(resp);
          
          setall_disease_master(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_disease_master()
    
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
       setdisease_master({
        medical_speciality_id:row.parent_lookup_id,
        disease_name:row.lookup_value,
        icd_10_code:row.other.icd_10_code,
        icd_11_code:row.other.icd_11_code,
        description:row.other.description
      })
    }

  const onDeletehospital=()=>
  {
    alert("delete")
  }

     const columns = [
        { field: 'sno', headerName: 'S.No.', flex: 0.2,renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1},
        { field: 'parent_lookup_name', headerName: 'Medical Speciality', flex: 0.5 }, 
        { field: 'lookup_value', headerName: 'Disease Name', flex: 0.5 },
        { field: 'other', headerName: 'Description',flex:1,  renderCell: (params) => {
            return params.row?.other?.description || "";
        }},
     
       
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
    
      const rows = all_disease_master?.map((doc, index) => ({
        id: doc._id || index,
        ...doc,
      }));




    //========================================= get medical speciality id ================================================

  const[medical_speciality,setmedical_speciality]=useState([])
      const getmedical_speciality=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"medical_speciality"})
          setmedical_speciality(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getmedical_speciality()
    
      },[])




   


    const handlechange = (e) => {
  const { name, value, checked, type } = e.target;

  setdisease_master((prev) => {
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


     
        const add_disease_master = async () => {
        try {
          setloading(true)
          const resp = await api.post("api/v1/admin/SaveLookup",
            {
              lookup_id:lookup_id,
              lookup_type:"disease_master",
              lookup_value:disease_master.disease_name,
              parent_lookup_id:disease_master.medical_speciality_id,
              other:{
                icd_10_code:disease_master.icd_10_code,
                icd_11_code:disease_master.icd_11_code,
                description:disease_master.description
              }
            }
          );
      
          if (resp.data.response.response_code === "200") {
              Swal.fire({
                      icon:"success",
                      title:"Disease Master Added",
                      text:"Disease Master Addedd Successfully...",
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
                  <h3>Enter Details for Disease Master</h3>
                  <p>Add or update the required details for the disease master to keep records accurate and complete.</p>
                  </div>
        
        
           {/* Form */}
                    <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
      <div className="form-grid">
          

               <FormControl fullWidth size="small">
             <label className="form-label">Medical Speciality ID</label>
            <Select 
              name="medical_speciality_id"
              value={disease_master.medical_speciality_id}
              onChange={handlechange}
             MenuProps={{
                    disablePortal: true,
                    disableScrollLock: true,
                    }}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>Medical Speciality ID</span>; // grey placeholder
                  }
                  return medical_speciality.find((item) => item._id === selected)?.lookup_value;
                }}
            >

               <MenuItem disabled value="">
                  <em>Medical Speciality ID</em>
                </MenuItem>
             {
                medical_speciality?.map((item)=>
                (
                    <MenuItem key={item._id} value={item._id}>{item.lookup_value}</MenuItem>
                ))
            }
            </Select>
          </FormControl> 


       <FormControl fullWidth size="small">
             <label className="form-label">Disease Name</label>
            <TextField 
              name="disease_name"
              defaultValue={disease_master.disease_name}
              onChange={handlechange}
              placeholder='Disease Name'
            >

            </TextField>
          </FormControl> 

        


           <FormControl fullWidth size="small">
            <label className="form-label">ICD 10 Code </label>
            <TextField 
              name="icd_10_code"
              defaultValue={disease_master.icd_10_code}
              onChange={handlechange}
              placeholder='ICD 10 Code'
            >
           
            </TextField>
          </FormControl> 

            <FormControl fullWidth size="small">
            <label className="form-label">ICD 11 Code </label>
            <TextField 
              name="icd_11_code"
              defaultValue={disease_master.icd_11_code}
              onChange={handlechange}
              placeholder='ICD 11 Code'
            >
           
            </TextField>
          </FormControl>

           <FormControl fullWidth size="small">
            <label className="form-label">Description</label>
            <TextField 
              name="description"
              defaultValue={disease_master.description}
              onChange={handlechange}
              placeholder='Description'
            >
           
            </TextField>
          </FormControl>

         </div>

          <Button
           className='submit-button'
            onClick={add_disease_master}
          >
            Submit
          </Button>
        </Paper>
        
        
      {/* Table */}
              <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                                              
              <DataGrid
               className="custom-data-grid"
                rows={rows}
                columns={columns}
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

export default DiseaseMaster
