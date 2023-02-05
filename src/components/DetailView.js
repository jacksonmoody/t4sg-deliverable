import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import getPreviews from '../utils/previews';
import { useEffect, useState } from 'react';

/*An alternative view to display more detailed information about each link*/

export default function DetailView({ entries }) {
    const [previews, setPreviews] = useState([]);

    /*Call function to get link previews from external API*/
    useEffect(() => {
        async function getLinkPreviews() {
            let getPreviewResults = await getPreviews(entries);
            for (let i = 0; i < getPreviewResults.length; i++) {
                if (getPreviewResults[i].detail !== undefined) { //The API could not find any information for this link
                    getPreviewResults[i] = {
                        title: entries[i].name,
                        description: entries[i].description,
                        image: {
                            url: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                        }
                    }
                }
            }
            setPreviews(getPreviewResults);
        }

        getLinkPreviews();
    }, [entries])

    try {
        const items = entries.map((entry, index) => (
            <Grid item xs={12} key={index}>
                <Box
                    sx={{
                        p: 2,
                        bgcolor: 'background.paper',
                        boxShadow: 3,
                        gap: 2,
                    }}
                >
                    {/*If items are not null, display them. Otherwise, display the appropriate error message*/}
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={20}>
                        <img src={previews[index] !== undefined && previews[index].hasOwnProperty('image') ? previews[index].image["url"] : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"} alt={entry.name} width="500" height="auto" />
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "30%",
                        }}>
                            <h1 align="center">{previews[index] !== undefined && previews[index].hasOwnProperty('title') ? previews[index].title : "No title available. Check the link again to see if it's valid."}</h1>
                            <h2 align="center">{previews[index] !== undefined && previews[index].hasOwnProperty('description') ? previews[index].description : "No description available."}</h2>
                            <Button variant="contained" size="small" href={entry.link} target="_blank" rel="noopener noreferrer">Visit Site</Button>
                        </Box>
                    </Stack>
                </Box>
            </Grid>
        ))

        return (
            <Grid container spacing={2}>
                {items}
            </Grid>
        )
    } catch (error) {
        console.log(error);
        return <h1>Invalid links. Please check database and retry.</h1>;
    }
}