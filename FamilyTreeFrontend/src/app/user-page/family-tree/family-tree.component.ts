import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import OrgChart from "@balkangraph/orgchart.js";
import { FamilyTree } from 'src/app/_model/family-tree';
import { ChartModel } from '../../_model/chart';

@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.css']
})
export class FamilyTreeComponent implements OnInit {
    @ViewChild('name') name: ElementRef;
    @ViewChild('title') title: ElementRef;
    @ViewChild('date') date: ElementRef;
    @ViewChild('n') n: ElementRef;
    @ViewChild('t') t: ElementRef;
    @ViewChild('d') d: ElementRef;
    @ViewChild('addToPartner') addToPartner: ElementRef;
    @ViewChild('addToChild') addToChild: ElementRef;

    constructor() { }

    charts: ChartModel[] = [];
    selectedTree: FamilyTree;
    nodeIds: number = 0;
    fileData: File = null;
    previewUrl:any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;
    partner: Boolean;
    edit: Boolean;
    isReadonly: Boolean;

    ngOnInit(): void {
        var tree = localStorage.getItem('selectedTree');
        this.selectedTree = JSON.parse(tree);
        this.charts = this.convertTreeToChart(this.selectedTree);
        if (this.charts.length == 0) {
            let model: ChartModel = new ChartModel();
            model.id = 0;
            model.name = "First person";
            model.title = "Undefined";
            model.date = "2020-";
            model.img = "../../../assets/images/no_image.png";
            this.charts.push(model);
        }
        this.drawTree(this.charts);
    }

    drawTree(charts: ChartModel[]): void {
        OrgChart.templates.family_template = Object.assign({}, OrgChart.templates.olivia);
        OrgChart.templates.family_template.size = [250, 120];
        OrgChart.templates.family_template.plus = "";
        OrgChart.templates.family_template.minus = "";
        OrgChart.templates.family_template.rippleRadius = 40;
        OrgChart.templates.family_template.defs = '<g transform="matrix(0.05,0,0,0.05,-13,-15.5)" id="baby"><circle cx="260" cy="310" r="200" fill="#ffffff"></circle><path fill="#aeaeae" d="m468.64 268.32h-13.591c-18.432-89.348-95.612-157.432-189.139-161.798-.501-.185-1.015-.348-1.545-.482-18.363-4.622-31.188-22.595-31.188-43.707 0-17.828 14.468-32.333 32.252-32.333 12.573 0 22.802 10.258 22.802 22.866 0 8.284 6.716 15 15 15s15-6.716 15-15c0-29.15-23.687-52.866-52.802-52.866-34.326 0-62.252 27.962-62.252 62.333 0 17.876 5.828 34.443 15.769 47.432-80.698 15.127-144.725 78.25-161.291 158.555h-13.591c-24.103 0-43.712 19.596-43.712 43.683 0 24.086 19.609 43.682 43.712 43.682h14.692c20.935 89.871 101.582 157.018 197.596 157.018s176.66-67.148 197.596-157.018h14.692c24.103 0 43.712-19.596 43.712-43.682 0-24.087-19.609-43.683-43.712-43.683zm-265.054 55.257c-8.284-.024-14.981-6.758-14.958-15.043.007-2.337-.708-13.999-15.481-14.041-.026 0-.053 0-.08 0-14.697 0-15.475 11.62-15.481 13.953-.023 8.284-6.75 15.007-15.043 14.957-8.284-.024-14.98-6.759-14.957-15.043.038-13.322 5.349-25.101 14.955-33.166 8.223-6.904 19.065-10.702 30.543-10.702h.148c11.534.033 22.412 3.896 30.63 10.876 9.559 8.12 14.803 19.928 14.765 33.25-.023 8.27-6.735 14.957-14.999 14.957-.013.002-.027.002-.042.002zm52.766 129.374c-26.485 0-48.033-21.533-48.033-48.002 0-8.284 6.716-15 15-15s15 6.716 15 15c0 9.926 8.089 18.002 18.033 18.002s18.033-8.076 18.033-18.002c0-8.284 6.716-15 15-15s15 6.716 15 15c-.001 26.469-21.548 48.002-48.033 48.002zm113.765-129.374c-.015 0-.029 0-.044 0-8.284-.024-14.98-6.759-14.957-15.043.016-5.445-1.993-9.263-6.14-11.673-5.407-3.142-13.27-3.165-18.695-.053-4.161 2.387-6.191 6.193-6.207 11.638-.023 8.27-6.735 14.957-14.999 14.957-.015 0-.029 0-.043 0-8.284-.024-14.981-6.758-14.958-15.043.046-16.149 7.802-29.845 21.281-37.576 14.814-8.497 33.929-8.443 48.695.138 13.434 7.807 21.112 21.547 21.066 37.696-.023 8.271-6.735 14.959-14.999 14.959z"/> </g>';
        var detailsIcon = '<i class="fas fa-info-circle"></i>';
        var editIcon = '<i class="fas fa-user-edit"></i>';
        var addNewPartnerIcon = '<i class="fa fa-venus-mars fa-fw"></i>';
        var addNewChildIcon = '<i class="fa fa-child fa-fw"></i>';
        OrgChart.templates.family_template_black = Object.assign({}, OrgChart.templates.family_template);
        OrgChart.templates.family_template_black.node = '<svg width="250" height="120"><rect width="250" height="120" style="fill:rgb(220,220,220);stroke-width:3;stroke:rgb(0,0,0)" /></svg>';

        var chart = new OrgChart(document.getElementById("tree"), {
            template: "family_template",
            enableSearch: true,
            siblingSeparation: 200,
            orientation: OrgChart.orientation.top,
            nodeMouseClick: OrgChart.action.none,
            menu: {
                pdf: { text: "Export PDF" },
                png: { text: "Export PNG" },
                svg: { text: "Export SVG" },
                csv: { text: "Export CSV" }
            },
            nodeBinding: {
                img_0: "img",
                field_0: "name",
                field_1: "title",
                field_2: "date"
            },
            nodeMenu: {
                data: { 
                    icon: detailsIcon,
                    text: "Details",
                    onClick: details
                },
                editing: { 
                    icon: editIcon,
                    text: "Edit datas",
                    onClick: editDatas
                },
                child: { 
                    icon: addNewChildIcon,
                    text: "Add new child",
                    onClick: addNewChild
                },
                partner: {
                    icon: addNewPartnerIcon,
                    text: "Add new partner",
                    onClick: addNewPartner
                },
                remove: { text: "Remove" }
            },
            tags: {
                black: {
                    template: "family_template_black"
                }
            }
        });
        var self = this;
        function addNewPartner(nodeId) {
            document.getElementById('id01').style.display='block';
            var nodeData = chart.get(nodeId);
            var node = nodeData["id"];
            self.nodeIds = Number(node);
            self.partner = true;
            self.edit = false;
            self.previewUrl = "../../../assets/images/no_image.png";
        }

        function addNewChild(nodeId) {
            document.getElementById('id01').style.display='block';
            var nodeData = chart.get(nodeId);
            var node = nodeData["id"];
            self.nodeIds = Number(node);
            self.partner = false;
            self.edit = false;
            self.previewUrl = "../../../assets/images/no_image.png";
        }
        
        function editDatas(nodeId) {
            self.edit = true;
            self.isReadonly = false;
            document.getElementById('id01').style.display='block';
            var nodeData = chart.get(nodeId);
            var node = nodeData["id"];
            self.n.nativeElement.value = nodeData["name"];
            self.t.nativeElement.value = nodeData["title"];
            self.d.nativeElement.value = nodeData["date"];
            self.previewUrl = nodeData["img"];
            self.nodeIds = Number(node);
        }

        function details(nodeId) {
            self.edit = true;
            self.isReadonly = true;
            document.getElementById('id01').style.display='block';
            var nodeData = chart.get(nodeId);
            var node = nodeData["id"];
            self.n.nativeElement.value = nodeData["name"];
            self.t.nativeElement.value = nodeData["title"];
            self.d.nativeElement.value = nodeData["date"];
            self.previewUrl = nodeData["img"];
            self.nodeIds = Number(node);
        }

        chart.on('render-link', function(sender, args){
            if (args.cnode.ppid != undefined){
                args.html += '<use xlink:href="#baby" x="'+ args.p.xa +'" y="'+ args.p.ya +'"/>';
            }
        });

        chart.on('imageuploaded', function (sender, file, inputHtmlElement) {
            var formData = new FormData();
            formData.append('file', file);  
        });  
       
        chart.load(charts);

    }

    convertTreeToChart(tree: FamilyTree): ChartModel[] {
        var chartModel: ChartModel[] = [];
        for (let i = 0; i < tree.members.length; i++) {
            chartModel[i] = new ChartModel();
            chartModel[i].id = tree.members[i].id;
            chartModel[i].name = tree.members[i].name;
            chartModel[i].img = tree.members[i].image;
            if (chartModel[i].img == "") {
                chartModel[i].img = "../../../assets/images/no_image.png";
            }
            chartModel[i].title = tree.members[i].title;
            chartModel[i].date = tree.members[i].date;
            chartModel[i].tags = [];
            if (tree.members[i].mother != null && tree.members[i].father != null) {
                if (tree.members[i].father.id < tree.members[i].mother.id) {
                    chartModel[i].pid = tree.members[i].father.id;
                    chartModel[i].ppid = tree.members[i].mother.id;
                }
                else {
                    chartModel[i].ppid = tree.members[i].father.id;
                    chartModel[i].pid = tree.members[i].mother.id;
                }
            }
            else if (tree.members[i].spouse != null) {
                chartModel[i].pid = tree.members[i].spouse.id;
                chartModel[i].tags[0] = "partner";
            }
            
            if (chartModel[i].date.substr(chartModel[i].date.length - 1) != "-") {
                chartModel[i].tags[1] = "black";
            }

        }
        
        return chartModel;
    }

    addPartner(): void {
        this.name.nativeElement.style.background = "rgba(255,255,255,1)";
        this.name.nativeElement.style.color = "rgba(0,0,0,1)";
        this.date.nativeElement.style.background = "rgba(255,255,255,1)";
        this.date.nativeElement.style.color = "rgba(0,0,0,1)";

        var date: string = this.date.nativeElement.value;
        var splitter: string[] = date.split("-");
        if (!Number(splitter[0]) || (splitter[1] != "" && !Number(splitter[1])) || 
            (Number(splitter[0]) > Number(splitter[1]) && splitter[1] != "")) {
            this.date.nativeElement.style.background = "rgba(255,0,0,.6)";
            this.date.nativeElement.style.color = "rgba(255,255,255,1)";
            return;
        }
        if (this.name.nativeElement.value == "") {
            this.name.nativeElement.style.background = "rgba(255,0,0,.6)";
            this.name.nativeElement.style.color = "rgba(255,255,255,1)";
            return;
        }

        if(this.fileData == null) {
            this.previewUrl = "../../../assets/images/no_image.png";
            document.getElementById('id01').style.display='none';
            let chartModel: ChartModel = new ChartModel();
            chartModel.id = this.charts.length + 1;
            chartModel.name = this.name.nativeElement.value;
            chartModel.title = this.title.nativeElement.value;
            chartModel.date = this.date.nativeElement.value;
            chartModel.pid = this.nodeIds;
            chartModel.tags = [];
            chartModel.tags[0] = "partner";
            if (this.addToChild.nativeElement.checked) {
                for (let i: number = 0; i < this.charts.length; i++) {
                    if ((this.charts[i].tags == null || !this.charts[i].tags.includes('partner')) && this.charts[i].pid == chartModel.pid 
                        && this.charts[i].ppid == null) {
                        this.charts[i].ppid = chartModel.id;
                    }
                }
            }
            if (chartModel.date.substr(chartModel.date.length - 1) != "-") {
                if (chartModel.tags == null)
                    chartModel.tags = [];
                chartModel.tags[chartModel.tags.length] = "black";
            }
            chartModel.img = this.previewUrl;
            this.name.nativeElement.value = "";
            this.title.nativeElement.value = "";
            this.date.nativeElement.value = "";
            this.charts.push(chartModel);
            this.nodeIds = 0;
            this.drawTree(this.charts);
        }
        else {
        var reader = new FileReader();      
        reader.readAsDataURL(this.fileData); 
        reader.onload = (_event) => { 
            this.previewUrl = reader.result;
            document.getElementById('id01').style.display='none';
            let chartModel: ChartModel = new ChartModel();
            chartModel.id = this.charts.length + 1;
            chartModel.name = this.name.nativeElement.value;
            chartModel.title = this.title.nativeElement.value;
            chartModel.date = this.date.nativeElement.value;
            chartModel.pid = this.nodeIds;
            chartModel.tags = [];
            chartModel.tags[0] = "partner";
            if (this.addToChild.nativeElement.checked) {
                for (let i: number = 0; i < this.charts.length; i++) {
                    if ((this.charts[i].tags == null || !this.charts[i].tags.includes('partner')) && this.charts[i].pid == chartModel.pid 
                        && this.charts[i].ppid == null) {
                        this.charts[i].ppid = chartModel.id;
                    }
                }
            }
            if (chartModel.date.substr(chartModel.date.length - 1) != "-") {
                if (chartModel.tags == null)
                    chartModel.tags = [];
                chartModel.tags[chartModel.tags.length] = "black";
            }
            chartModel.img = this.previewUrl;
            this.name.nativeElement.value = "";
            this.title.nativeElement.value = "";
            this.date.nativeElement.value = "";
            this.charts.push(chartModel);
            this.nodeIds = 0;
            this.drawTree(this.charts);
        }
    }
        
    }

    addChild(): void {
        this.name.nativeElement.style.background = "rgba(255,255,255,1)";
        this.name.nativeElement.style.color = "rgba(0,0,0,1)";
        this.date.nativeElement.style.background = "rgba(255,255,255,1)";
        this.date.nativeElement.style.color = "rgba(0,0,0,1)";

        var date: string = this.date.nativeElement.value;
        var splitter: string[] = date.split("-");
        if (!Number(splitter[0]) || (splitter[1] != "" && !Number(splitter[1])) ||
            (Number(splitter[0]) > Number(splitter[1]) && splitter[1] != "")) {
            this.date.nativeElement.style.background = "rgba(255,0,0,.6)";
            this.date.nativeElement.style.color = "rgba(255,255,255,1)";
            return;
        }
        if (this.name.nativeElement.value == "") {
            this.name.nativeElement.style.background = "rgba(255,0,0,.6)";
            this.name.nativeElement.style.color = "rgba(255,255,255,1)";
            return;
        }

        if(this.fileData == null) {
            this.previewUrl = "../../../assets/images/no_image.png";
            document.getElementById('id01').style.display='none';
            let chartModel: ChartModel = new ChartModel();
            chartModel.id = this.charts.length + 1;
            chartModel.name = this.name.nativeElement.value;
            chartModel.title = this.title.nativeElement.value;
            chartModel.date = this.date.nativeElement.value;
            chartModel.pid = this.nodeIds;
            chartModel.img = this.previewUrl;
            if (this.addToPartner.nativeElement.checked) {
                for (let i: number = 0; i < this.charts.length; i++) {
                    if(this.charts[i].tags != null) {
                        if (this.charts[i].id == this.nodeIds && this.charts[i].tags.includes('partner')) {
                            chartModel.ppid = this.nodeIds;
                            chartModel.pid = this.charts[i].pid;
                        }
                    }
                }

                for (let i: number = 0; i < this.charts.length; i++) {
                    if(this.charts[i].tags != null) {
                        if (this.charts[i].tags.includes('partner') && this.charts[i].pid == this.nodeIds) {
                            chartModel.ppid = this.charts[i].id;
                        }
                    }
                }
                
            }
            if (chartModel.date.substr(chartModel.date.length - 1) != "-") {
                if (chartModel.tags == null)
                    chartModel.tags = [];
                chartModel.tags[chartModel.tags.length] = "black";
            }
            this.name.nativeElement.value = "";
            this.title.nativeElement.value = "";
            this.date.nativeElement.value = "";

            this.charts.push(chartModel);
            this.nodeIds = 0;
            this.drawTree(this.charts);
        }
        else {
            var reader = new FileReader();      
            reader.readAsDataURL(this.fileData); 
            reader.onload = (_event) => { 
                this.previewUrl = reader.result;
                document.getElementById('id01').style.display='none';
                let chartModel: ChartModel = new ChartModel();
                chartModel.id = this.charts.length + 1;
                chartModel.name = this.name.nativeElement.value;
                chartModel.title = this.title.nativeElement.value;
                chartModel.date = this.date.nativeElement.value;
                chartModel.pid = this.nodeIds;
                chartModel.img = this.previewUrl;
                if (this.addToPartner.nativeElement.checked) {
                    for (let i: number = 0; i < this.charts.length; i++) {
                        if(this.charts[i].tags != null) {
                            if (this.charts[i].id == this.nodeIds && this.charts[i].tags.includes('partner')) {
                                chartModel.ppid = this.nodeIds;
                                chartModel.pid = this.charts[i].pid;
                            }
                        }
                    }

                    for (let i: number = 0; i < this.charts.length; i++) {
                        if(this.charts[i].tags != null) {
                            if (this.charts[i].tags.includes('partner') && this.charts[i].pid == this.nodeIds) {
                                chartModel.ppid = this.charts[i].id;
                            }
                        }
                    }
                    
                }
                if (chartModel.date.substr(chartModel.date.length - 1) != "-") {
                    if (chartModel.tags == null)
                        chartModel.tags = [];
                    chartModel.tags[chartModel.tags.length] = "black";
                }
                this.name.nativeElement.value = "";
                this.title.nativeElement.value = "";
                this.date.nativeElement.value = "";

                this.charts.push(chartModel);
                this.nodeIds = 0;
                this.drawTree(this.charts);
            }
        }
    }

    editing(): void {
        this.n.nativeElement.style.background = "rgba(255,255,255,1)";
        this.n.nativeElement.style.color = "rgba(0,0,0,1)";
        this.d.nativeElement.style.background = "rgba(255,255,255,1)";
        this.d.nativeElement.style.color = "rgba(0,0,0,1)";

        var date: string = this.d.nativeElement.value;
        var splitter: string[] = date.split("-");
        if (!Number(splitter[0]) || (splitter[1] != "" && !Number(splitter[1])) || 
            (Number(splitter[0]) > Number(splitter[1]) && splitter[1] != "")) {
            this.d.nativeElement.style.background = "rgba(255,0,0,.6)";
            this.d.nativeElement.style.color = "rgba(255,255,255,1)";
            return;
        }
        if (this.n.nativeElement.value == "") {
            this.n.nativeElement.style.background = "rgba(255,0,0,.6)";
            this.n.nativeElement.style.color = "rgba(255,255,255,1)";
            return;
        }

        if(this.fileData == null) {
            if (!Number(this.nodeIds)) {
                this.previewUrl = "../../../assets/images/no_image.png";
                this.charts = [];
                this.charts[0] = new ChartModel();
                this.charts[0].id = 1;
                this.charts[0].name = this.n.nativeElement.value;
                this.charts[0].title = this.t.nativeElement.value;
                this.charts[0].date = this.d.nativeElement.value;
                this.charts[0].img = this.previewUrl;
                if (this.charts[0].date.substr(this.charts[0].date.length - 1) != "-") {
                    if (this.charts[0].tags == null)
                        this.charts[0].tags = [];
                    this.charts[0].tags[this.charts[0].tags.length] = "black";
                }
            }
            else {
                for (let i:number = 0; i < this.charts.length; i++) {
                    if (this.charts[i].id == this.nodeIds) {
                        this.charts[i].name = this.n.nativeElement.value;
                        this.charts[i].title = this.t.nativeElement.value;
                        this.charts[i].date = this.d.nativeElement.value;
                        if (this.charts[i].date.substr(this.charts[i].date.length - 1) != "-") {
                            if (this.charts[i].tags == null)
                                this.charts[i].tags = [];
                            this.charts[i].tags[this.charts[i].tags.length] = "black";
                        }
                    }
                }
            }

            this.n.nativeElement.value = "";
            this.t.nativeElement.value = "";
            this.d.nativeElement.value = "";

            this.nodeIds = 0;
            this.drawTree(this.charts);
        }
        else {
            var reader = new FileReader();      
            reader.readAsDataURL(this.fileData); 
            reader.onload = (_event) => { 
                this.previewUrl = reader.result;
                if (!Number(this.nodeIds)) {
                    this.charts = [];
                    this.charts[0] = new ChartModel();
                    this.charts[0].id = 1;
                    this.charts[0].name = this.n.nativeElement.value;
                    this.charts[0].title = this.t.nativeElement.value;
                    this.charts[0].date = this.d.nativeElement.value;
                    this.charts[0].img = this.previewUrl;
                    if (this.charts[0].date.substr(this.charts[0].date.length - 1) != "-") {
                        if (this.charts[0].tags == null)
                        this.charts[0].tags = [];
                        this.charts[0].tags[this.charts[0].tags.length] = "black";
                    }
                }
                else {
                    for (let i:number = 0; i < this.charts.length; i++) {
                        if (this.charts[i].id == this.nodeIds) {
                            this.charts[i].name = this.n.nativeElement.value;
                            this.charts[i].title = this.t.nativeElement.value;
                            this.charts[i].date = this.d.nativeElement.value;
                            this.charts[i].img = this.previewUrl;
                            if (this.charts[i].date.substr(this.charts[i].date.length - 1) != "-") {
                                if (this.charts[i].tags == null)
                                    this.charts[i].tags = [];
                                this.charts[i].tags[this.charts[i].tags.length] = "black";
                            }
                        }
                    }
                }
                this.n.nativeElement.value = "";
                this.t.nativeElement.value = "";
                this.d.nativeElement.value = "";
                this.nodeIds = 0;
                this.drawTree(this.charts);
            }
        }
        document.getElementById('id01').style.display='none';
    }

    fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
        this.preview();
    }
    
    preview() {
        // Show preview 
        var mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
          return;
        }
    
        var reader = new FileReader();      
        reader.readAsDataURL(this.fileData); 
        reader.onload = (_event) => { 
          this.previewUrl = reader.result;
        }
    }

    

}
