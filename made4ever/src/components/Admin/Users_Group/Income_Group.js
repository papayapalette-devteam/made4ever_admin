import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  FormControl,
  MenuItem,
  Paper,
  Menu,
} from "@mui/material";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import api from "../../../api";
import Swal from "sweetalert2";
import UniqueLoader from "../loader";
import { DataGrid } from "@mui/x-data-grid";
import Adminsidebar from "../adminsidebar";
import Adminheader from "../adminheader";

function IncomeGroup() {
  const [loading, setloading] = useState(false);

  const [Income_Group, setIncome_Group] = useState({
    income_group: "",
  });

  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid pages start from 0
    pageSize: 10,
  });

  const [All_Income_Group, setAll_Income_Group] = useState([]);
  const getall_income_group = async (
    pageNumber = paginationModel.page,
    limitNumber = paginationModel.pageSize
  ) => {
    try {
      setloading(true);
      const params = new URLSearchParams();

      // Pagination
      params.append("page", pageNumber + 1); // backend is 1-indexed
      params.append("limit", limitNumber);

      // Always include lookup_type
      params.append("lookup_type", "income_group");

      // Optionally, if you want to filter by parent_lookup_id
      // params.append("parent_lookup_id", "SOME_PARENT_ID");

      const resp = await api.get(`api/admin/LookupList?${params.toString()}`);

      setAll_Income_Group(resp.data.data);
      setRowCount(resp.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getall_income_group();
  }, []);

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

  const [lookup_id, setlookup_id] = useState(null);
  const onEdit = (row) => {
    setlookup_id(row._id);
    setIncome_Group({ income_group: row.lookup_value });
  };

  const onDelete = async (row) => {
    try {
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this Income Group?",
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

      const resp = await api.delete(`api/admin/RemoveLookup?id=${row._id}`);

      if (resp.status === 200) {
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Income Group Deleted",
            text: "Income Group Deleted Successfully...",
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
    { field: "lookup_value", headerName: "Income Group", flex: 0.5 },
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
                  onEdit(params.row);
                  handleCloseMenu();
                }}
              >
                Edit
              </MenuItem>
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

  const rows = All_Income_Group?.map((doc, index) => ({
    id: doc._id || index,
    ...doc,
  }));

  const handlechange = (e) => {
    const { name, value, checked, type } = e.target;

    setIncome_Group((prev) => {
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

  const add_income_group = async () => {
    try {
      setloading(true);
      const resp = await api.post("api/admin/SaveLookup", {
        lookup_id: lookup_id ? lookup_id : null,
        lookup_type: "income_group",
        lookup_value: Income_Group.income_group,
        parent_lookup_id: null,
      });

      if (resp.status === 200) {
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Education Group Added",
            text: "Education Group Addedd Successfully...",
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
      console.error("❌ API Error:", error.response.data.message);
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
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      <Adminheader />

      <div className="layout">
        <Adminsidebar />
        <div className="content-wrapper">
          <div className="main-content">
            <div className="profile-header">
              <h3>Enter Details for Income Group Master</h3>
              <p>
                Add or update the required details for the income group master
                to keep records accurate and complete.
              </p>
            </div>

            {/* Form */}
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
              <div className="form-grid">
                <FormControl fullWidth size="small">
                  <label className="form-label">Income Group Name </label>
                  <TextField
                    name="income_group"
                    defaultValue={Income_Group.income_group}
                    onChange={handlechange}
                    placeholder="Income Group Name"
                  ></TextField>
                </FormControl>
              </div>

              <Button className="submit-button" onClick={add_income_group}>
                Submit
              </Button>
            </Paper>

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
      </div>

      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255, 255, 255, 0.6)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UniqueLoader />
        </div>
      )}
    </div>
  );
}

export default IncomeGroup;
