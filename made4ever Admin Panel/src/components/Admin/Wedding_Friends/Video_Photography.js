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



function VideoPhotography() {

    const [VideoGrapher, setVideoGrapher] = useState({
    videographer_name: "",
    videographer_link: "",
    videographer_description: "",
    videographer_image: "",
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


// =============================get create login for list=====================================

  const[login_for,setlogin_for]=useState([])
      const getall_login_for=async()=>
      {
        try {
          const resp=await api.post('api/v1/common/LookupList',{"lookup_type": "entity_type"})
          setlogin_for(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_login_for()
    
      },[])

  

// =================================get org list==============================================

  const[allorgunits,setallorgunits]=useState([])
      const getallorgunits=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"org_unit_type"})
          setallorgunits(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getallorgunits()
    
      },[])

//================================= get station list=================================================

       const[allstationmaster,setallstationmaster]=useState([])
      const getallstation_list=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/StationList',{ page:1, limit:10, search:"" })
          console.log(resp);
          
          setallstationmaster(resp.data.data.list)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getallstation_list()
    
      },[])


//========================================= get entity type ================================================

 const[allassest_category_level1,setallassest_category_level1]=useState([])
      const getallassest_category=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"asset_category_level_1"})
          setallassest_category_level1(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getallassest_category()
    
      },[])




//====================================== get asset ========================================================

      const[allasset_master_list,setallasset_master_list]=useState([])
      const[entitytype,setentitytype]=useState(null)
      const getall_assest_master=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/AssetList',
            {
            page: 1,
            limit: 10,
            AssetCategoryLevel1: entitytype,
            // "AssetCategoryLevel2": "64f1a2b3c4d5e6f7g8h9i0j2",
            // "search": "hospital"
            }
          )
      
         
          
          setallasset_master_list(resp.data.data.list)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        if(entitytype)
        {
           getall_assest_master()
        }
       
      },[entitytype])
  
console.log(entitytype);



const handlechange = (e) => {
  const { name, value, checked, type } = e.target;

  setVideoGrapher((prev) => {
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
          const resp = await api.post("api/v1/admin/CreateAssetLogin",VideoGrapher);
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
                  <h3>Enter Details for VideoGrapher</h3>
                  <p>Add or update the required details for the videographer to keep records accurate and complete.</p>
                  </div>
        
        
              {/* Form */}
                  <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
              <div className="form-grid">
        

          <FormControl fullWidth size="small">
            <label className='form-label'>Name</label>
           <TextField
            name="videographer_name"
            placeholder="Videographer Name"
            defaultValue={VideoGrapher.videographer_name}
            onChange={handlechange}
          />
          </FormControl>

          
        
         <FormControl fullWidth size="small">
            <label className='form-label'>Link</label>
          <TextField
            name="videographer_link"
            placeholder="Videographer Link"
            defaultValue={VideoGrapher.videographer_link}
            onChange={handlechange}
          />
          </FormControl>

         <FormControl fullWidth size="small">
            <label className='form-label'>Description</label>
            <TextField
            name="videographer_description"
            placeholder="Videographer Description"
            defaultValue={VideoGrapher.videographer_description}
            onChange={handlechange}
            size="small"
          />
          </FormControl>

            <FormControl fullWidth size="small">
            <label className='form-label'>Image</label>
            <TextField
            type='file'
            name="planner_image"
            defaultValue={VideoGrapher.videographer_image}
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

export default VideoPhotography
