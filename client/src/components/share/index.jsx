import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const Share = ({ post, picturePath }) => {
    // const handleShare = async () => {
    //     try {
    //         // Check if Web Share API is supported
    //         console.log('Picture Path:', picturePath);
    //         // console.log(post)
    //         if (navigator.share) {
    //             const response = await fetch(`${picturePath}`)
    //             console.log(response)
    //             const blob = await response.blob();
    //             console.log(blob)
    //             const filesArray = [new File([blob], 'image.jpg', { type: blob.type })];
    //             const shareData = {
    //                 files:filesArray,
    //                 text: `Caption: ${post._doc.caption}\nUrlForImg: ${picturePath}\nPostlocation:-${window.location.href}`
    //             };
    //             await navigator.share(shareData);
    //             console.log('Shared successfully');
    //         } else {
    //             console.log('Web Share API not supported');
    //         }
    //     } catch (error) {
    //         console.error('Error sharing:', error);
    //     }
    // };
    const handleShare = async () => {
        try {
            // Check if Web Share API is supported
            console.log('Picture Path:', picturePath);
            // console.log(post)
            if (navigator.share) {
                const shareData = {
                    text: `Caption: ${post._doc.caption}\nImage: ${picturePath}\nLocation:-${window.location.href}`
                };
                await navigator.share(shareData);
                console.log('Shared successfully');
            } else {
                console.log('Web Share API not supported');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };
    return (
        <SendOutlinedIcon sx={{ fontSize: "1.7rem" }} onClick={handleShare} />
    );
}
export default Share;