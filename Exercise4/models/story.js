const { DateTime } = require('luxon');
const {v4: uuidv4} = require('uuid');

const stories = [
    {
        id: '1',
        title: 'A funny story',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        author: 'Lijaun',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '2',
        title: 'It is rainning',
        content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam',
        author: 'Micahel',
        createdAt: DateTime.local(2021, 2, 12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '3',
        title: 'Learning NBAD',
        content: 'I am doing this assignment for module 4. I have to write a couple sentences in this content field.',
        author: 'DeCristo Franceschini',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }
];

exports.find = () => stories;

exports.findById = id => stories.find(story=>story.id === id);

exports.save = function(story){
    story.id = uuidv4();
    story.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    stories.push(story);
};

exports.updateById = function(id, newStory) {
    let story = stories.find(story=>story.id === id);
    if (story) {
        story.title = newStory.title;
        story.content = newStory.content;
        return true;
    }
    else {
        return false;
    }
};

exports.deleteById = function(id) {
    let index = stories.findIndex(story =>story.id === id);
    if (index != -1) {
        stories.splice(index, 1);
        return true;
    }
    else {
        return false;
    }
    
};