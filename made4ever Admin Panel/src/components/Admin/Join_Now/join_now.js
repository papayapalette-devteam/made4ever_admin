import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Paper,
  TextField,
  IconButton,
  CircularProgress,
  MenuItem,
  Menu,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";


import api from "../../../api";
import Swal from "sweetalert2";
import UniqueLoader from "../loader";
import Adminsidebar from "../adminsidebar";
import Adminheader from "../adminheader";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Joinnow() {
  const [loading, setLoading] = useState("");



  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid pages start from 0
    pageSize: 10,
  });

  const [All_Contactus, setAll_Contactus] = useState([]);
  const getall_contactus = async (
    pageNumber = paginationModel.page,
    limitNumber = paginationModel.pageSize
  ) => {
    try {
      setLoading("get-contactus");
      const params = new URLSearchParams();

      // Pagination
      params.append("page", pageNumber + 1); // backend is 1-indexed
      params.append("limit", limitNumber);

      const resp = await api.get(`api/join-now/get-join-now?${params.toString()}`);

      setAll_Contactus(resp.data.data);
      setRowCount(resp.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading("");
    }
  };

  useEffect(() => {
    getall_contactus();
  }, [paginationModel]);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);

  const handleOpenMenu = (event, rowId) => {
    setMenuAnchor(event.currentTarget);
    setMenuRowId(rowId);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setMenuRowId(null);
  };




  const onDelete = async (row) => {
    try {
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this Enquiry?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        customClass: {
          popup: "small-swal-popup",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-cancel-button",
        },
      });

      // 🔹 If user cancels, stop execution
      if (!confirmResult.isConfirmed) return;

      const resp = await api.delete(`api/join-now/delete-join-now/${row._id}`);

      if (resp.status === 200) {
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Enquiry Deleted",
            text: "Enquiry Deleted Successfully...",
            showConfirmButton: true,
            customClass: {
              popup: "small-swal-popup",
              confirmButton: "my-swal-button",
            },
          }).then(() => {
            window.location.reload();
          });
        }, 0);
      } else {
        console.warn("⚠️ Error:", resp.data.response.data.message);
        setTimeout(() => {
          Swal.fire({
            icon: "error",
            title: "Error Occured",
            text: resp.data.response.data.message,
            showConfirmButton: true,
            customClass: {
              confirmButton: "my-swal-button",
            },
          }).then(() => {
            window.location.reload();
          });
        }, 0);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Error Occurred",
          text: error.response?.data?.message || "Something went wrong",
          showConfirmButton: true,
          customClass: { confirmButton: "my-swal-button" },
        }).then(() => {
          window.location.reload(); // optional, you can remove this if not needed
        });
      }, 0);
    }
  };

  const column = [
    {
      field: "sno",
      headerName: "S.No.",
      flex: 0.2,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone No.", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "interest", headerName: "Intrest", flex: 1 },
    { field: "message", headerName: "Message", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={(e) => handleOpenMenu(e, params.row._id)}>
            <MoreVertIcon />
          </IconButton>

          {menuRowId === params.row._id && (
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleCloseMenu}
              disableScrollLock
            >
    
              <MenuItem
                onClick={() => {
                  onDelete(params.row);
                  handleCloseMenu();
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          )}
        </>
      ),
    },
  ];

  const rows = All_Contactus?.map((doc, index) => ({
    id: doc._id || index,
    ...doc,
  }));

 




  return (
    <div>
      <Adminheader />

      <div className="layout">
        <Adminsidebar />
        <div className="content-wrapper">
          <div className="main-content">
            <div className="profile-header">
              <h3>Join Now</h3>
              <p>Manage all new members and join now enquiry.</p>
            </div>

     

            {/* Table */}
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2, marginTop: 4 }}>
              <DataGrid
                className="custom-data-grid"
                rows={rows}
                columns={column}
                rowCount={rowCount}
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10]}
                disableSelectionOnClick
              />
            </Paper>
          </div>
        </div>
        {loading === "save-blog" && (
          <div className="loader-overlay">
            <UniqueLoader />
          </div>
        )}
      </div>
    </div>
  );
}

export default Joinnow;
