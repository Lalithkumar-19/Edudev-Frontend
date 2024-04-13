import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { VideoFileOutlined } from '@mui/icons-material';
import Course_videos from './Course_videos';

export default function AccordionTemp({ heading, content }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '100%', flexShrink: 0, textAlign: 'start' ,fontWeight:"900" }}>
                        {heading}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {content && Array.isArray(content) && content.map((item, i) => {
                            return (
                                <div >
                                
                                    <Typography key={i} sx={{ width: '100%', flexShrink: 0, textAlign: 'start' ,display:"flex" ,alignItems:"center",justifyContent:"space-between",background:"",paddingLeft:"9px",border:"1px solid black",marginBottom:"6px"}}>
                                        {item.video_title}  <span className='video_icon' key={i}><VideoFileOutlined color='primary' /></span>

                                    </Typography>


                                </div>
                            )
                        })



                        }

                    </Typography>
                </AccordionDetails>
            </Accordion>


        </div>
    );
}
