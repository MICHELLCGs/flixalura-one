import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import videosData from '../../db'; // Ajusta la ruta según tu estructura de archivos

const VideoContext = createContext();

export const useVideoContext = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {

        setVideos(videosData.videos);
    }, []);

    const addVideo = (video) => {
        setVideos((prevVideos) => [...prevVideos, { ...video, id: prevVideos.length + 1 }]);
    };

    const updateVideo = (updatedVideo) => {
        setVideos((prevVideos) =>
            prevVideos.map((video) => (video.id === updatedVideo.id ? updatedVideo : video))
        );
    };

    const deleteVideo = (videoId) => {
        setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
    };

    return (
        <VideoContext.Provider value={{ videos, addVideo, updateVideo, deleteVideo }}>
            {children}
        </VideoContext.Provider>
    );
};

VideoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default VideoContext;
