

// CourseContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Initial state based on your schema
const initialState = {
    course_name: '',
    creator_objid: '',
    course_actual_price: 0,
    course_intro_video: "",
    course_price: 0,
    course_duration: { length: "", field: "W" },
    course_lectures: 0,
    course_language: 'English',
    skill_level: 'Beginner',
    certificate: false,
    Deadline: new Date(),
    category: '',
    course_description: '',
    learning_objs: [],
    requirements: [],
    Tags: [],
    curriculm: [],
    noticeboard: "",
    assignments: "",
};

// Create context
const CourseContext = createContext();

// Create a provider component with a reducer
const CourseProvider = ({ children }) => {
    const [state, dispatch] = useReducer(courseReducer, initialState);

    return (
        <CourseContext.Provider value={{ state, dispatch }}>
            {children}
        </CourseContext.Provider>
    );
};

// Custom hook to use the context
const useCourseContext = () => {
    const context = useContext(CourseContext);
    if (!context) {
        throw new Error('useCourseContext must be used within a CourseProvider');
    }
    return context;
};


const courseReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return { ...state, [action.field]: action.value };

        case 'ADD_TAGS':
            return { ...state, Tags: [...action.value] };

        case 'ADD_LEARNING_OBJ':
            return { ...state, learning_objs: [...state.learning_objs, action.value] };
        case 'ADD_REQUIREMENT':
            return { ...state, requirements: [...state.requirements, action.value] }

        case 'ADD_CURRICULUM':
            return {
                ...state,
                curriculm: [...state.curriculm, { title: action.title, curriculum_content: action.curriculum_content }],
            };
        case "total_update":
            return {
                Deadline: action.payload.Deadline,
                ...action.payload,
            }
        // Add more cases for different actions if needed

        default:
            return state;
    }
};

export { CourseProvider, useCourseContext };
