import React, {useState} from "react";
import {Formik} from "formik";
import "./style.scss";
import validationSchemaFor from "./validationSchemaFor";
import axios from "axios";
import {useHistory} from "react-router-dom";
import DashboardLayout from "../shared/layout/DashaboardLayout";
import {Button, Box, makeStyles} from "@material-ui/core";
import AttachFileIcon from "./AttatchFileIcon";
import {useForm} from "react-hook-form";
import "./AddProject.scss";
import { message, } from "antd";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "20px",
        marginBottom: "20px",
    },

    formSpacing: {
        padding: "20px",
    },
    cardBtn: {
        textTransform: "capitalize",
        background: "transparent",
        boxShadow: "none",
        marginBottom: "17px",
        marginTop: "17px",
        fontSize: "11px",
        padding: "8px",
        borderRadius: "6px",
    },
}));

const iconStyling = {
    marginRight: "8px",
};
const AddProject = (props) => {
    const [file, setFile] = useState(null);
    const classes = useStyles();
    const history = useHistory();
    const handleUpload = async (data) => {
        try {
            if (file) {
                let formData = new FormData();
                formData.append("file", file, "file");

                let res = await axios.post(`${process.env["REACT_APP_API_URL"]}api/v1/projects`, formData,
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('access_token')}`
                        }
                    });
                if (res.status == 200) {
                    history.push('/projects')
                }else if(res.status == 422){
                    message.error('Sorry! Invalid File Type');
                }
            }
        } catch (error) {
            console.log("response", error);
            if(error.message == "Request failed with status code 422"){
                message.error('Sorry! Invalid File Type');
            }
        }
    };
    const {register, handleSubmit, errors} = useForm();
    return (
        <>
            <DashboardLayout activeKey={5}>
                <form onSubmit={handleSubmit(handleUpload)} className={classes.formSpacing}>
                    <Box style={{marginLeft: "20px", cursor: "pointer"}}>
                        <label className="myBox">
                            {/* <AttachFileIcon style={iconStyling} className="myIcon"/> */}
                            <span className="IconsWorks">
          <i class="fa fa-paperclip fa-5x" aria-hidden="true"></i>
          </span>

                            Upload
                            <input
                                type="file"
                                style={{display: "none"}}
                                accept=".mpp"
                                onChange={(e) => {
                                    setFile(e.target.files[0]);
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"

                                className={classes.cardBtn}
                                className="alignButton"
                                style={{background: "#000827"}}
                                onClick={handleSubmit(handleUpload)}
                            >
                                Send
                            </Button>

                            <label style={{marginLeft: "10px", color: "#201E1E"}}>
                                {file?.name}
                            </label>
                        </label>
                    </Box>
                    <Box justifyContent="flex-start" style={{
                        marginBottom: "8px",

                    }}>
                    </Box>
                </form>
            </DashboardLayout>
        </>
    );
};
export default AddProject;
