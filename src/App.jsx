import { useState } from 'react';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const addProject = () => {
    if (newProject.trim()) {
      setProjects([...projects, { name: newProject, tasks: [] }]);
      setNewProject('');
    }
  };

  const addTask = (projectIndex, taskText, deadline, priority) => {
    if (taskText.trim()) {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].tasks.push({ 
        text: taskText, 
        status: 'Not Done', 
        deadline, 
        priority,
        comments: []
      });
      setProjects(updatedProjects);
    }
  };

  const updateTaskStatus = (projectIndex, taskIndex, newStatus) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].tasks[taskIndex].status = newStatus;
    setProjects(updatedProjects);
  };

  const addComment = (projectIndex, taskIndex, comment) => {
    if (comment.trim()) {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].tasks[taskIndex].comments.push(comment);
      setProjects(updatedProjects);
    }
  };

  return (
    <div className="container">
      <h1>Project Management Tool</h1>
      <div className="project-input">
        <input
          type="text"
          placeholder="Enter a new project"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />
        <button onClick={addProject}>Add Project</button>
      </div>
      <div className="project-list">
        {projects.map((project, projectIndex) => (
          <div key={projectIndex} className="project">
            <h2 onClick={() => setSelectedProject(projectIndex)}>{project.name}</h2>
            {selectedProject === projectIndex && (
              <div className="task-section">
                <input
                  type="text"
                  placeholder="Enter a new task"
                  id="taskText"
                />
                <input
                  type="date"
                  id="taskDeadline"
                />
                <select id="taskPriority">
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <button
                  onClick={() => addTask(projectIndex, 
                    document.getElementById('taskText').value, 
                    document.getElementById('taskDeadline').value,
                    document.getElementById('taskPriority').value)}
                >
                  Add Task
                </button>
                <ul>
                  {project.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className={`task ${task.status.replace(' ', '-').toLowerCase()}`}>
                      {task.text} - {task.priority} Priority - Due: {task.deadline}
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(projectIndex, taskIndex, e.target.value)}
                      >
                        <option>Not Done</option>
                        <option>In Progress</option>
                        <option>Done</option>
                      </select>
                      <div className="comments">
                        <h4>Comments</h4>
                        <ul>
                          {task.comments.map((comment, i) => (
                            <li key={i}>{comment}</li>
                          ))}
                        </ul>
                        <input
                          type="text"
                          placeholder="Add a comment"
                          id={`commentInput-${projectIndex}-${taskIndex}`}
                        />
                        <button onClick={() => addComment(projectIndex, taskIndex, document.getElementById(`commentInput-${projectIndex}-${taskIndex}`).value)}>
                          Add Comment
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
