import { Box } from "@mui/material"
import { useEffect, useState } from "react";
import Stories from "react-insta-stories"
import { useSelector } from "react-redux";
const Story = () => {
    const user = useSelector((state)=>state.user);
    const [storyData, setStoryData] = useState([]);
    const getStories = async () => {
        const res = await fetch(`http://localhost:3001/stories/${user._id}`, {
            method: "GET"
        })
        const data = await res.json();
        setStoryData(data);
    }
    useEffect(() => {
        getStories()
    }, [])

    return (
        <Box>
            {
                storyData && (
                    // console.log(storyData)
                    <Stories
                        // stories={storyData}
                        stories={storyData}
                        defaultInterval={1500}
                        width={432}
                        height={768}
                    />
                )
            }
        </Box>
    )
}
export default Story