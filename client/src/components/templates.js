import React, { Component } from 'react';
import './templates.css';

class Templates extends Component {
  constructor() {
    super();
    this.state = {
      templates: [],
      selectedTemplate: 0,
      numOfTemplates: 0,
      templateIndex: 0
    };
  }

  componentDidMount() {
    this.getAllTemplates();
  }

  selectTemplateById(selectedTemplate){
    this.setState({selectedTemplate});
  }

  getAllTemplates(){
    fetch(`/api/templates`)
      .then(res => res.json())
      .then(res => this.setState({
        templates: res.data,
        templateIndex: res.index,
        numOfTemplates: res.length
      }));
  }

  slidePage(direction){
    const { templates} = this.state;
    fetch(`/api/templates?template_id=${templates[0].id}&direction=${direction}`)
      .then(res => res.json())
      .then(res => this.setState({
        templates: res.data,
        templateIndex: res.index,
        numOfTemplates: res.length,
        selectedTemplate: direction === 'next' ? 0 : 3
      }));
  }

  render() {
    const { templates, selectedTemplate, numOfTemplates, templateIndex} = this.state;
    const nextAllowed = (templateIndex + 4 <= numOfTemplates);
    const previewAllowed = (templateIndex - 4 >= 0);
    return (
      <div>
        <div id="main" role="main">
          <div id="large">
            <img src={templates[selectedTemplate] && `images/large/${templates[selectedTemplate].image}`} alt="text" width="430" height="360" />
            <div className="details">
              <p><strong>Title</strong> {templates[selectedTemplate] && templates[selectedTemplate].title}</p>
              <p><strong>Description</strong> {templates[selectedTemplate] && templates[selectedTemplate].description}</p>
              <p><strong>Cost</strong> ${templates[selectedTemplate] && templates[selectedTemplate].cost}</p>
              <p><strong>ID #</strong> {templates[selectedTemplate] && templates[selectedTemplate].id}</p>
              <p><strong>Thumbnail File</strong> {templates[selectedTemplate] && templates[selectedTemplate].thumbnail}</p>
              <p><strong>Large Image File</strong> {templates[selectedTemplate] && templates[selectedTemplate].image}</p>
            </div>
          </div>
          <div className="thumbnails">
            <div className="group">
              {templates.map((template, index) =>
                <a key={template.id} href="/#" title={template.title} className={selectedTemplate === index ? 'active' : ''}>
                  <img src={`images/thumbnails/${template.thumbnail}`} alt={template.description} width="145" height="121" onClick={this.selectTemplateById.bind(this, index)} />
                  <span>{template.id}</span>
                </a>
              )}
              <span
                style={{background: 'url(images/previous.png)'}}
                className={previewAllowed ? 'previous' : 'previous disabled'}
                title="Previous"
                onClick={previewAllowed ? this.slidePage.bind(this, 'previous') : undefined}
              >Previous</span>
              <span
                style={{background: 'url(images/next.png)'}}
                className={nextAllowed ? 'next' : 'next disabled'}
                title="Next"
                onClick={nextAllowed ? this.slidePage.bind(this, 'next') : undefined}
              >Next</span>
            </div>
          </div>
        </div>
        <footer>
          <a href="instructions.pdf">Download PDF Instructions</a>
        </footer>
      </div>
    );
  }
}

export default Templates;