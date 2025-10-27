import React, { useState , useEffect} from 'react';
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



function MspGallary() {

  const[loading,setloading]=useState(false

  )
     const [Msp_Gallary, setMsp_Gallary] = useState({
    msp_gallary: "",
  
  });



      const[allaggravating_master,setallaggravating_master]=useState([])
      const getall_aggravating_master=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"aggravating_factor_master"})
          console.log(resp);
          
          setallaggravating_master(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_aggravating_master()
    
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
    setMsp_Gallary({
      symptom_id:row.parent_lookup_id,
      aggravating_factor:row.lookup_value})
  }

  const onDeletehospital=()=>
  {
    alert("delete")
  }

     const columns = [
        { field: 'sno', headerName: 'S.No.', flex: 0.2,renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1},
        { field: 'parent_lookup_name', headerName: 'Photos', flex: 1 },
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
    
      const rows = allaggravating_master?.map((doc, index) => ({
        id: doc._id || index,
        ...doc,
      }));





//========================================= get symtom class id ================================================

  const[symtop_id,setsymtop_id]=useState([])
      const get_stymptom_class_id=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"symptom_master"})
          setsymtop_id(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        get_stymptom_class_id()
    
      },[])

   


    const handlechange = (e) => {
  const { name, value, checked, type } = e.target;

  setMsp_Gallary((prev) => {
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


     
        const add_aggravating_master = async () => {
        try {
          setloading(true)
           const resp = await api.post("api/v1/admin/SaveLookup",
            {
              lookup_id:lookup_id,
              lookup_type:"education_group",
              lookup_value:Msp_Gallary.msp_gallary,
              parent_lookup_id:null
            }
          );
      
          if (resp.data.response.response_code === "200") {
              Swal.fire({
                      icon:"success",
                      title:"Aggravating Master Added",
                      text:"Aggravating Master Addedd Successfully...",
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
                  <h3>Upload MSP Gallary</h3>
                  <p>Add or update the msp gallary to keep records accurate and complete.</p>
                  </div>
        
        
           {/* Form */}
                    <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
      <div className="form-grid">
          
     


           <FormControl fullWidth size="small">
            <label className="form-label">Upload MSP Gallary </label>
            <TextField 
              type='file'
              name="msp_gallary"
              value={Msp_Gallary.msp_gallary}
              onChange={handlechange}
            >
           
            </TextField>
          </FormControl> 


         
         </div>

          <Button
           className='submit-button'
            onClick={add_aggravating_master}
          >
            Submit
          </Button>
        </Paper>
        
        
      {/* Table */}
              <Paper elevation={3} sx={{ p: 2, borderRadius: 2,marginTop:4 }}> 
                                              
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

export default MspGallary
