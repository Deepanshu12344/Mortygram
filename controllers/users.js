import User from "../models/User.js"

export const getUser= async(request,response)=>{
    try {
        const {id} = request.params;
        const user = await User.findById(id);
        if(!user) return response.status(404).send("User not found");
        response.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}

export const getUserFriends= async(request,response)=>{
    try {
        const {id} = request.params;
        const user = await User.findById(id);
        if(!user) return response.status(404).send("User not found");

        const friends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        const formattedFriends = friends.map(
            ({_id, firstname, lastname, occupation, location, picturePath})=>{
                return {_id, firstname, lastname, occupation, location, picturePath};
            }
        );
        response.status(200).json(formattedFriends);
    } catch (error) {
        console.log(error);
    }
}

export const addRemoveFriend= async(request,response)=>{
    try {
        
    } catch (error) {
        console.log(error);
    }
}