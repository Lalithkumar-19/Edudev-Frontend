import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import FirstStep from './Steppers/FirstStep';
import Secondstep from './Steppers/Secondstep';
import ThirdStep from './Steppers/ThirdStep';
import { useState } from 'react';
import { useEffect } from 'react';




export default function Stepper() {
    const [first_step_completed, setFirst_step_completed] = useState(false);


    const steps = [
        {
            label: 'Course Title And Description',
            description: "Enter course meta details ",
            page: <FirstStep completed={setFirst_step_completed} />

        },
        {
            label: 'Course circuilum and videos content',
            description: "Create sections for this course",
            page: <Secondstep />
        },
        {
            label: 'Course Notice board and Assignments board',
            description: "create notice board and assigments for this course",
            page: <ThirdStep />
        },
    ];
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        if (localStorage.getItem("first_step")) {
            setFirst_step_completed(true);
        } else {
            setFirst_step_completed(false);
        }
    }, []);

    return (
        <Box sx={{ width: '100%', flexGrow: 1 }}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: 'white',
                    mb: 2,
                    borderBottom: '1px solid #f1f5f9'
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2d3748' }}>{steps[activeStep].label}</Typography>
            </Paper>
            <Box sx={{ width: '100%', p: 2 }}>

                <p style={{ color: "#fe7f50", textAlign: "center", margin: "0 0 20px 0", fontSize: "16px", fontWeight: "500" }}>
                    {steps[activeStep].description}
                </p>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    {steps[activeStep].page}
                </div>

            </Box>
            <MobileStepper
                variant="dots"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                sx={{
                    width: "100%",
                    bgcolor: "transparent",
                    padding: "1rem 0",
                    '& .MuiMobileStepper-dotActive': { backgroundColor: '#fe7f50' }
                }}
                nextButton={
                    <Button
                        size="medium"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                        sx={{
                            backgroundColor: '#fe7f50',
                            color: 'white',
                            '&:hover': { backgroundColor: '#ff6b3d' },
                            '&:disabled': { backgroundColor: '#cbd5e1', color: 'white' },
                            fontWeight: 'bold',
                            padding: '8px 24px',
                            borderRadius: '8px',
                            textTransform: 'none'
                        }}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button
                        size="medium"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        sx={{
                            color: '#718096',
                            fontWeight: 'bold',
                            textTransform: 'none'
                        }}
                    >
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    );
}
