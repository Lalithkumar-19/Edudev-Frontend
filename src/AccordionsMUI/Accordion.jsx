import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function BasicAccordion({visible_title,hidden_details}) {
    return (
        <div>
            <Accordion  id='accordion'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography sx={{textAlign:"justify"}}>{visible_title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                       {hidden_details}
                    </Typography>
                </AccordionDetails>
            </Accordion>
           
        </div>
    );
}
