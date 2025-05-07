import { FC, JSX } from "react";
import {
  Box,
  Grid,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface TProps {}

const BoardsPage: FC<TProps> = () => {
  type Task = {
    name: string;
    date: string;
    owner: string;
  };

  type TaskCategory = "To do" | "In progress" | "On approval" | "Done";

  const tasks: Record<TaskCategory, Task[]> = {
    "To do": [
      { name: "Restaurant Case", date: "June 10, 2021", owner: "Lukas" },
      { name: "Banking App Mobile", date: "June 16, 2021", owner: "Sophia" },
    ],
    "In progress": [
      { name: "Health Care Shot", date: "June 10, 2021", owner: "Michael" },
      { name: "Furniture Store", date: "June 12, 2021", owner: "Anna" },
    ],
    "On approval": [
      { name: "Porsche Case", date: "June 6, 2021", owner: "Sarah" },
      { name: "Clothing Store", date: "June 8, 2021", owner: "James" },
    ],
    Done: [
      { name: "Logofolio #2", date: "June 4, 2021", owner: "Emma" },
      { name: "Web App", date: "May 30, 2021", owner: "Noah" },
    ],
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5">Design boards</Typography>
        <Button variant="contained" color="primary">
          + Add task
        </Button>
      </Box>

      <Grid container spacing={1}>
        {(Object.keys(tasks) as TaskCategory[]).map((category, index) => (
          <Grid size={{ xs: 12, sm: 3 }} key={index}>
            <Paper
              sx={{
                p: 2,
                bgcolor:
                  index === 0
                    ? "#fffae5"
                    : index === 1
                      ? "#f5f5ff"
                      : index === 2
                        ? "#e8fbe8"
                        : "#ffe8f0",
              }}
            >
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
  );
};

export default BoardsPage;
