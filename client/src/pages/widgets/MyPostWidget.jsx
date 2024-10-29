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
    const theme = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);

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
        <WidgetWrapper
            sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
            }}
        >
            <Box display="flex" alignItems="center" mb="1rem">
                <UserImage image={picturePath} size="50px" />
                <InputBase
                    placeholder="What's on your mind?"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    sx={{
                        flex: 1,
                        backgroundColor: theme.palette.background.default,
                        borderRadius: "20px",
                        padding: "0.5rem 1rem",
                        color: theme.palette.text.primary,
                        ml: "1rem",
                    }}
                />
            </Box>

            {isImage && (
                <Box
                    border={`1px solid ${theme.palette.divider}`}
                    borderRadius="8px"
                    p="0.5rem"
                    mb="1rem"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Dropzone onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
                        {({ getRootProps, getInputProps }) => (
                            <Box {...getRootProps()} p="1rem" sx={{ cursor: "pointer" }}>
                                <input {...getInputProps()} />
                                {!image ? (
                                    <Typography color={theme.palette.text.secondary}>
                                        Drag & drop or click to select an image
                                    </Typography>
                                ) : (
                                    <Typography color={theme.palette.text.secondary}>
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

            <Divider sx={{ borderColor: theme.palette.divider, my: "1rem" }} />

            <FlexBetween>
                <Box display="flex" gap="1rem">
                    <IconButton onClick={() => setIsImage(!isImage)}>
                        <ImageOutlined sx={{ color: theme.palette.text.secondary }} />
                    </IconButton>
                    <IconButton>
                        <GifBoxOutlined sx={{ color: theme.palette.text.secondary }} />
                    </IconButton>
                    <IconButton>
                        <AttachFileOutlined sx={{ color: theme.palette.text.secondary }} />
                    </IconButton>
                    <IconButton>
                        <MicOutlined sx={{ color: theme.palette.text.secondary }} />
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
