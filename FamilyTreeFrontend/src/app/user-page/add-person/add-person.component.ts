import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FamilyTree } from 'src/app/_model/family-tree';
import { FirstPersonDTO } from 'src/app/_model/first-person-dto';
import { WithParentDTO } from 'src/app/_model/with-parent-dto';
import { WithPartnerDTO } from 'src/app/_model/with-partner-dto';
import { FamilyTreeService } from 'src/app/_services/family-tree-service';
import { FamilyTreeComponent } from '../family-tree/family-tree.component';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  @ViewChild('name') name: ElementRef;
  @ViewChild('title') title: ElementRef;
  @ViewChild('birth') birth: ElementRef;
  @ViewChild('death') death: ElementRef;
  @ViewChild('partner') partner: ElementRef;
  @ViewChild('parent') parent: ElementRef;

  constructor(private http: HttpClient, private service: FamilyTreeService, private familyTree: FamilyTreeComponent) { }

  parentHidden: Boolean = true;
  partnerHidden: Boolean = true; 
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  partners: string[] = [];
  parents: string[] = [];
  selectedTree: FamilyTree = null;
  parentNoPartner: Boolean = false;

  ngOnInit(): void {
    setInterval(()=> { this.callSelectedTree() }, 1 * 1000);
  }

  callSelectedTree(): void {
    var tree = localStorage.getItem('selectedTree');
    this.selectedTree = JSON.parse(tree);
  }

  radioButtonChecked(num: number) {
    this.parents = [];
    this.partners = [];
    for (let i: number = 0; i < this.selectedTree.members.length; i++) {
      let name: string = this.selectedTree.members[i].name;
      let title: string = "";
      if (this.selectedTree.members[i].title != "")
        title = "(" + this.selectedTree.members[i].title + ")";
      let date: string = "[" + this.selectedTree.members[i].date + "]";

      this.partners.push(name + " " + title + " " + date);
    }

    for (let i: number = 0; i < this.selectedTree.members.length; i++) {
      if (this.selectedTree.members[i].spouse != null) {
        let parent1: string = this.selectedTree.members[i].name;
        let parent2: string = this.selectedTree.members[i].spouse.name;

        this.parents.push(parent1 + " and " + parent2);
      }
    }

    if(num == 1) {
      this.partnerHidden = false;
      this.parentHidden = true;
      this.parentNoPartner = false;
    }
    else if(num == 2) {
      this.partnerHidden = true;
      this.parentHidden = false;
      this.parentNoPartner = true;
    }
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
  
  onSubmit(): void {
    if(this.fileData == null) {
      this.previewUrl = "../../../assets/images/no_image.png";
      this.sendValues();
    }
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => { 
      this.previewUrl = reader.result;
      this.sendValues();
    }
  }

  sendValues(): void {
    this.birth.nativeElement.style.background = "rgba(255,255,255,1)";
    this.birth.nativeElement.style.color = "rgba(0,0,0,1)";
    this.death.nativeElement.style.background = "rgba(255,255,255,1)";
    this.death.nativeElement.style.color = "rgba(0,0,0,1)";
    let name: string = this.name.nativeElement.value;
    let title: string = this.title.nativeElement.value;
    let birth: string = this.birth.nativeElement.value;
    if (!Number(birth)) {
      this.birth.nativeElement.style.background = "rgba(255,0,0,.6)";
      this.birth.nativeElement.style.color = "rgba(255,255,255,1)";
      return;
    }
    let death: string = this.death.nativeElement.value;
    if(!Number(death) && death != "") {
      this.death.nativeElement.style.background = "rgba(255,0,0,.6)";
      this.death.nativeElement.style.color = "rgba(255,255,255,1)";
      return;
    }

    if (Number(birth) > Number(death) && death != "") {
      this.birth.nativeElement.style.background = "rgba(255,0,0,.6)";
      this.birth.nativeElement.style.color = "rgba(255,255,255,1)";
      this.death.nativeElement.style.background = "rgba(255,0,0,.6)";
      this.death.nativeElement.style.color = "rgba(255,255,255,1)";
      return;
    }

    if (this.parentNoPartner && this.selectedTree.members.length > 0) {
      let parent: string = this.parent.nativeElement.value;
      let model: WithParentDTO = new WithParentDTO();
      model.id = this.selectedTree.id;
      model.name = name;
      model.title = title;
      model.birth = birth;
      model.death = death;
      model.parents = parent;
      model.img = this.previewUrl;
      this.service.addPersonWithParent(model).subscribe(
        (res: FamilyTree)=> {
          alert('OK');
        },
        err=> {
          alert('Something went wrong');
        }
      )
    }
    else if (this.selectedTree.members.length > 0){
      let partner: string = this.partner.nativeElement.value;
      let model: WithPartnerDTO = new WithPartnerDTO();
      model.id = this.selectedTree.id;
      model.name = name;
      model.title = title;
      model.birth = birth;
      model.death = death;
      model.partner = partner;
      model.img = this.previewUrl;
      this.service.addPersonWithPartner(model).subscribe(
        (res: FamilyTree)=> {
          this.selectedTree = res;
          localStorage.setItem('selectedTree', JSON.stringify(this.selectedTree));
          alert(this.selectedTree.members.length);
          this.familyTree.drawTree();
        },
        err=> {
          alert('Something went wrong');
        }
      )
    }
    else {
      let model: FirstPersonDTO = new FirstPersonDTO();
      model.id = this.selectedTree.id;
      model.name = name;
      model.title = title;
      model.birth = birth;
      model.death = death;
      model.img = this.previewUrl;
      this.service.addFirstPerson(model).subscribe(
        res=> {
          alert('Ok');
        },
        err=> {
          alert('Something went wrong');
        }
      )
    }
  }
  

}
