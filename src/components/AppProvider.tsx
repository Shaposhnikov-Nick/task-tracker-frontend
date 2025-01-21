"use client"
import {FC, JSX, ReactNode} from 'react'
import { Box, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import {Container, Grid2} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ru } from "date-fns/locale";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

type AppProviderProps = {
    children: ReactNode
}

const AppProvider: FC<AppProviderProps> = ({children}) => {
    const tasks = {
        'To do': [
            { name: 'Restaurant Case', date: 'June 10, 2021', owner: 'Lukas' },
            { name: 'Banking App Mobile', date: 'June 16, 2021', owner: 'Sophia' },
        ],
        'In progress': [
            { name: 'Health Care Shot', date: 'June 10, 2021', owner: 'Michael' },
            { name: 'Furniture Store', date: 'June 12, 2021', owner: 'Anna' },
        ],
        'On approval': [
            { name: 'Porsche Case', date: 'June 6, 2021', owner: 'Sarah' },
            { name: 'Clothing Store', date: 'June 8, 2021', owner: 'James' },
        ],
        'Done': [
            { name: 'Logofolio #2', date: 'June 4, 2021', owner: 'Emma' },
            { name: 'Web App', date: 'May 30, 2021', owner: 'Noah' },
        ],
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f9f9fc' }}>
            {/* Левое меню */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 240,
                    bgcolor: '#ffffff',
                    boxShadow: 2,
                    p: 2,
                }}
            >
                <Box sx={{ mb: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        3:20:00
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {['Time tracker', 'Boards', 'Projects', 'Analytics', 'Settings'].map((item, index) => (
                        <Button
                            key={index}
                            variant="text"
                            sx={{
                                justifyContent: 'flex-start',
                                color: index === 1 ? 'primary.main' : 'text.secondary',
                                fontWeight: index === 1 ? 'bold' : 'normal',
                            }}
                        >
                            {item}
                        </Button>
                    ))}
                </Box>
            </Box>

            {/* Контент */}
            <Box sx={{ flex: 1, overflowY: 'auto', p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5">Design boards</Typography>
                    <Button variant="contained" color="primary">
                        + Add task
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {Object.keys(tasks).map((category, index) => (
                        <Grid item xs={12} md={6} lg={3} key={index}>
                            <Paper sx={{ p: 2, bgcolor: index === 0 ? '#fffae5' : index === 1 ? '#f5f5ff' : index === 2 ? '#e8fbe8' : '#ffe8f0' }}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    {category}
                                </Typography>
                                <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Task</TableCell>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Owner</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {tasks[category].map((task, taskIndex) => (
                                                <TableRow key={taskIndex}>
                                                    <TableCell>{task.name}</TableCell>
                                                    <TableCell>{task.date}</TableCell>
                                                    <TableCell>{task.owner}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
    // return (
    //     <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
    //         <div  style={{
    //             minHeight: "100vh",
    //             display: "flex",
    //             flexDirection: "column",
    //         }}>
    //             {/* HEADER */}
    //             <Grid2 container>
    //                 Header
    //             </Grid2>
    //             {/* BODY CONTENT */}
    //             <Container maxWidth={"xl"} style={{ padding: "1rem 1.25rem" }}>
    //                 {children}
    //             </Container>
    //             {/*/!* FOOTER *!/*/}
    //             <Grid2 container>
    //                 Footer
    //             </Grid2>
    //         </div>
    //     </LocalizationProvider>
    // )
}

export default AppProvider