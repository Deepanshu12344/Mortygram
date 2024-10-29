import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    MicOutlined,
    ImageOutlined,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";

const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        // formData.append("firstName", firstName); // Add first name
        // formData.append("lastName", lastName);   // Add last name
    
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }
    
        const response = await fetch(`http://localhost:3000/posts`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
    
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
    };
    

    return (
        <WidgetWrapper sx={{ backgroundColor: "#333", color: "#fff" }}>
            <Box display="flex" alignItems="center" mb="1rem">
                <UserImage image={picturePath} size="50px" />
                <InputBase
                    placeholder="What's on your mind?"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    sx={{
                        flex: 1,
                        backgroundColor: "#444",
                        borderRadius: "20px",
                        padding: "0.5rem 1rem",
                        color: "#fff",
                        ml: "1rem",
                    }}
                />
            </Box>

            {isImage && (
                <Box
                    border="1px solid #555"
                    borderRadius="8px"
                    p="0.5rem"
                    mb="1rem"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Dropzone
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <Box {...getRootProps()} p="1rem" sx={{ cursor: 'pointer' }}>
                                <input {...getInputProps()} />
                                {!image ? (
                                    <Typography color="#aaa">
                                        Drag & drop or click to select an image
                                    </Typography>
                                ) : (
                                    <Typography color="#aaa">
                                        {image.name}
                                    </Typography>
                                )}
                            </Box>
                        )}
                    </Dropzone>
                    {image && (
                        <IconButton onClick={() => setImage(null)}>
                            <DeleteOutlined color="primary" />
                        </IconButton>
                    )}
                </Box>
            )}

            <Divider sx={{ borderColor: "#555", my: "1rem" }} />

            <FlexBetween>
                <Box display="flex" gap="1rem">
                    <IconButton onClick={() => setIsImage(!isImage)}>
                        <ImageOutlined sx={{ color: "#aaa" }} />
                    </IconButton>
                    <IconButton>
                        <GifBoxOutlined sx={{ color: "#aaa" }} />
                    </IconButton>
                    <IconButton>
                        <AttachFileOutlined sx={{ color: "#aaa" }} />
                    </IconButton>
                    <IconButton>
                        <MicOutlined sx={{ color: "#aaa" }} />
                    </IconButton>
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    disabled={!post}
                    onClick={handlePost}
                >
                    POST
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default MyPostWidget;
