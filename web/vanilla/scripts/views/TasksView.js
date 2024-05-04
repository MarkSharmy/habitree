import AbstractView from "./AbstractView.js";

export default class extends AbstractView
{
    constructor(params)
    {
        super(params);
        this.setTitle("Habitree: All Tasks");
    }

    async getHtml()
    {
        return `
        <div class="head-title">
            <h1>Dashboard</h1>
            <ul class="breadcrumb">
                <li><a href="/dashboard/">Dashboard</a></li>
                <li><i class="bx bx-chevron-right"></i></li>
                <li><a href="/dashboard/" class="active" data-link>All Tasks</a></li>
            </ul>
        </div>
        <div id="display-tasks">
            <div class="tabs">
                <input type="radio" class="tabs-radio" name="tasks" id="miscs">
                <label for="miscs" class="tabs-label toggle active">Tasks</label>
                <div class="tabs-content">
                    <header>
                        <hgroup class="left">
                            <span class="selection">
                                <input type="checkbox" name="selectall" id="selectall">
                                <label for="selectall">Select All</label>
                            </span>
                            <span class="sort">
                                <label>Sort</label>
                                <i class='bx bx-filter'></i>
                            </span>
                        </hgroup>
                        <hgroup class="right">
                            <button data-modal-create="#modal">+ Add Task</button>
                        </hgroup>
                    </header>
                    <ul class="task-list">
                        <li data-modal-target="#modal">
                            <div class="item-box">
                                <span class="icon"><img src="/images/icons_read.svg" alt="icon"></span>
                                <h3 class="title">Read book: Flutter in Action</h3>
                                <div class="progress-bar"></div>
                            </div>
                            <span class="menu"><i class='bx bx-dots-vertical-rounded' ></i></span>
                        </li>
                    </ul>
                </div>
                <input type="radio" class="tabs-radio" name="tasks" id="goals">
                <label for="goals" class="tabs-label">Goals</label>
                <div class="tabs-content">
                    <header>
                        <hgroup class="left">
                            <span class="selection">
                                <input type="checkbox" name="selectall" id="selectall">
                                <label for="selectall">Select All</label>
                            </span>
                            <span class="sort">
                                <label>Sort</label>
                                <i class='bx bx-filter'></i>
                            </span>
                        </hgroup>
                        <hgroup class="right">
                            <button data-modal-target="#modal">+ Add Goal</button>
                        </hgroup>
                    </header>
                </div>
                <input type="radio" class="tabs-radio" name="tasks" id="projects">
                <label for="projects" class="tabs-label">Projects</label>
                <div class="tabs-content">
                    <header>
                        <hgroup class="left">
                            <span class="selection">
                                <input type="checkbox" name="selectall" id="selectall">
                                <label for="selectall">Select All</label>
                            </span>
                            <span class="sort">
                                <label>Sort</label>
                                <i class='bx bx-filter'></i>
                            </span>
                        </hgroup>
                        <hgroup class="right">
                            <button data-modal-target="#modal">+ Add Project</button>
                        </hgroup>
                    </header>
                </div>
                <input type="radio" class="tabs-radio" name="tasks" id="resolutions">
                <label for="resolutions" class="tabs-label">Resolutions</label>
                <div class="tabs-content">
                    <header>
                        <hgroup class="left">
                            <span class="selection">
                                <input type="checkbox" name="selectall" id="selectall">
                                <label for="selectall">Select All</label>
                            </span>
                            <span class="sort">
                                <label>Sort</label>
                                <i class='bx bx-filter'></i>
                            </span>
                        </hgroup>
                        <hgroup class="right">
                            <button data-modal-target="#modal">+ Add Resolution</button>
                        </hgroup>
                    </header>
                </div>
            </div>
            <div class="popup" id="modal">
                <header>
                    <div class="title">
                        <span class="text">Title:</span>
                        <input type="text" id="title" placeholder="Enter title">
                    </div>
                    <button data-close-button class="btn-close">&times;</button>
                </header>
                <article class="body">
                    <hgroup>
                        <label for="list-type">Type: </label>
                        <span>
                            <select name="list-type" id="list-type">
                                <option value="Todo">Todo</option>
                            </select>
                        </span>
                        <button class="btn-add">Do Today</button>
                    </hgroup>
                    <section>
                        <ul id="task-items"></ul>
                        <div class="add-entry">
                            <input type="text" placeholder="add sub task" id="data-entry">
                            <button data-btn-add>+</button>
                        </div>
                    </section>
                    <footer>
                        <button id="delete-task" class="btn-delete" data-close-button>Delete</button>
                        <button id="update-task" class="btn-save" data-close-button>Save</button>
                    </footer>
                </article>
            </div>
            <div id="overlay"></div>
        </div>
        `;
    }
}