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
// import UniqueLoader from '../../../other component/loader';
import { DataGrid } from '@mui/x-data-grid';
import Adminsidebar from '../adminsidebar';
import Adminheader from '../adminheader';
import '../admincss/common_config.css'



function Jwellers() {

    const [Jweller, setJweller] = useState({
    jweller_name: "",
    jweller_link: "",
    jweller_description: "",
    jweller_image: "",
  });



  

      const[alllogin_list,setalllogin_list]=useState([])
      const getalllogin_list=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/UserList',{ page:1, limit:10, search:"" })
          console.log(resp);
          
          setalllogin_list(resp.data.data.list)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getalllogin_list()
    
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

  const onEdithospital=()=>
  {
    alert("edit")
  }

  const onDeletehospital=()=>
  {
    alert("delete")
  }

     const columnshospital = [
        { field: 'sno', headerName: 'S.No.', flex: 0.2,renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1},
        { field: 'id', headerName: 'Image', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'email', headerName: 'Description', flex: 1 },
        { field: 'md5_password', headerName: 'Link', flex: 1 },
       
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
                  onEdithospital(params.row._id);
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
    
      const rowshospital = alllogin_list?.map((doc, index) => ({
        id: doc._id || index,
        ...doc,
      }));






const handlechange = (e) => {
  const { name, value, checked, type } = e.target;

  setJweller((prev) => {
    // Handle boolean radios (true/false as string)
    const booleanFields = ["IsEmailVerified", "IsPhoneVerified"];
    if (booleanFields.includes(name)) {
      return { ...prev, [name]: value === "true" };
    }

    // Handle checkboxes (single boolean)
    if (type === "checkbox" && !Array.isArray(prev[name])) {
      return { ...prev, [name]: checked };
    }

    // Handle checkboxes (array)
    if (type === "checkbox" && Array.isArray(prev[name])) {
      const updated = checked
        ? [...prev[name], value]
        : prev[name].filter((item) => item !== value);
      return { ...prev, [name]: updated };
    }

    // Normal single-value field
    return { ...prev, [name]: value };
  });
};


//========================== post api for create login master=============================
     
        const addstation_master = async () => {
        try {
          const resp = await api.post("api/v1/admin/CreateAssetLogin",Jweller);
          console.log(resp);
          
          if (resp.data.response.response_code === "200") {
              Swal.fire({
                      icon:"success",
                      title:"Login Created",
                      text:"Login Created Successfully...",
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
            Swal.fire({
                      icon:"error",
                      title:"Error Occured",
                      text:resp.data.response.response_message.error,
                      showConfirmButton:true,
                       customClass: {
                      confirmButton: 'my-swal-button',
                    }
                  })
            console.warn("⚠️ Error:", resp.data.response.response_message);
          }
        } catch (error) {
          console.error("❌ API Error:", error);
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
                  <h3>Enter Details for Jwellers</h3>
                  <p>Add or update the required details for the jwellers to keep records accurate and complete.</p>
                  </div>
        
        
              {/* Form */}
                  <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
              <div className="form-grid">
        

          <FormControl fullWidth size="small">
            <label className='form-label'>Name</label>
           <TextField
            name="jweller_name"
            placeholder="Jweller Name"
            defaultValue={Jweller.jweller_name}
            onChange={handlechange}
          />
          </FormControl>

          
        
         <FormControl fullWidth size="small">
            <label className='form-label'>Link</label>
          <TextField
            name="jweller_link"
            placeholder="Jweller Link"
            defaultValue={Jweller.jweller_link}
            onChange={handlechange}
          />
          </FormControl>

         <FormControl fullWidth size="small">
            <label className='form-label'>Description</label>
            <TextField
            name="jweller_description"
            placeholder="Jweller Description"
            defaultValue={Jweller.jweller_description}
            onChange={handlechange}
            size="small"
          />
          </FormControl>

            <FormControl fullWidth size="small">
            <label className='form-label'>Image</label>
            <TextField
            type='file'
            name="jweller_image"
            defaultValue={Jweller.jweller_image}
            onChange={handlechange}
            size="small"
          />
          </FormControl>

          </div>

          <Button
         className='submit-button'
            onClick={addstation_master}
          >
            Submit
          </Button>
        </Paper>
        
        
      {/* Table */}
             <Paper elevation={3} sx={{ p: 2, borderRadius: 2,marginTop:4 }}> 
                            
                                              
              <DataGrid
               className="custom-data-grid"
                rows={rowshospital}
                columns={columnshospital}
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
    </div>
  )
}

export default Jwellers
