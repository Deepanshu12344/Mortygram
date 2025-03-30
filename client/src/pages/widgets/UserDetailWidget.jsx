import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid, Avatar } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper"; // Assuming you have this component for styling
import UserImage from "../../components/UserImage"; // Assuming you have a UserImage component

const UserDetailWidget = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null); // State to hold user data
    const [posts, setPosts] = useState([]); // State to hold user posts

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userResponse = await fetch(`http://localhost:3000/users/${id}`,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json"
                    }
                });
                const userData = await userResponse.json();
                setUser(userData);
                console.log(user);

                const postsResponse = await fetch(`http://localhost:3000/users/${id}/posts`);
                const postsData = await postsResponse.json();
                setPosts(postsData);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, [id]);

    if (!user) return <Typography>Loading...</Typography>; // Loading state

    return (
        <WidgetWrapper
            sx={{
                padding: "1rem",
                marginTop: "1rem",
                marginLeft: "40px",
                marginRight: "auto",
                maxWidth: "800px",
            }}
        >
            {/* User Profile Section */}
            <Box display="flex" flexDirection="column" alignItems="center" mb="2rem">
                <UserImage
                    image={user.picturePath}
                    size="120px" // Change size as per requirement
                    sx={{ borderRadius: "50%", border: "2px solid #e0e0e0" }} // Custom styles
                />
                <Typography variant="h5" fontWeight="bold" mt="1rem">
                    {user.firstname} {user.lastname}
                </Typography>
                <Typography color="textSecondary" fontSize="0.9rem">
                    {user.location} {/* You can add more user attributes here */}
                </Typography>
                <Typography color="textSecondary" fontSize="0.9rem">
                    {user.occupation}
                </Typography>
                <Typography mt="0.5rem" textAlign="center">
                    {user.bio} {/* Assuming bio is a field in the user data */}
                </Typography>
            </Box>

            <hr />

            {/* Posts Section */}
            <Grid container spacing={2}>
                {posts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} key={post._id}>
                        <Box
                            sx={{
                                backgroundColor: "#f9f9f9",
                                padding: "1rem",
                                borderRadius: "8px",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src={post.picturePath}
                                alt={post.description}
                                style={{ width: "100%", borderRadius: "8px" }}
                            />
                            <Typography variant="body2" mt="0.5rem">
                                {post.description}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </WidgetWrapper>
    );
};

export default UserDetailWidget;
