const express = require('express');
const cors = require('cors');
const { readFileSync } = require('fs');
const app = express();
const port = 5000;

const templates = readFileSync('data/templates.json');
const parsedTemplate = JSON.parse(templates);
const sortedTemplates = parsedTemplate.sort((a, b) => {
  return a.id - b.id;
});

const numberOfTemplates = 4;

/**
*   Get all templates
*   @query string template_id [optional]
*   @query string direction [optional]
*   @return {array} of objects
*/
app.get('/api/templates', cors(), (req, res) => {
  const { template_id, direction } = req.query;
  const templateLength = parsedTemplate.length;

  let response = {
    length: templateLength,
    index: 0,
    data: sortedTemplates.slice(0, numberOfTemplates)
  };

  if(template_id && direction) {
    const template = sortedTemplates.find(t => t.id === template_id);
    const templateIndex = sortedTemplates.findIndex(object => {
      return object.id === template.id;
    });
    if(direction === 'next'){
      const nextCursor = (templateIndex + numberOfTemplates);
      response.data = sortedTemplates.slice(nextCursor > templateLength ? templateLength : nextCursor, numberOfTemplates+nextCursor);
      response.index = nextCursor >= templateLength ? templateLength : nextCursor;
    }
    else{
      const previewCursor = (templateIndex - numberOfTemplates);
      response.data = sortedTemplates.slice(previewCursor <= 0 ? 0 : previewCursor, numberOfTemplates+previewCursor);
      response.index = previewCursor <= 0 ? 0 : previewCursor;
    }
  }

  res.json(response);
});

app.listen(port, (err) => {
  if (err) console.log("Error in server setup")
  console.log(`Server running on port ${port}`);
})