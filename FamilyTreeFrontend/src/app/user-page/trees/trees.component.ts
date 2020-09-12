import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/_model/user';
import { UserService } from 'src/app/_services/user-service';
import { FamilyTreeService } from 'src/app/_services/family-tree-service';
import { FamilyTree } from 'src/app/_model/family-tree';

@Component({
  selector: 'app-trees',
  templateUrl: './trees.component.html',
  styleUrls: ['./trees.component.css']
})
export class TreesComponent implements OnInit {
  @ViewChild('newFamilyName') newFamilyName: ElementRef;
  @ViewChild('newFamilyDescription') newFamilyDescription: ElementRef;
  @ViewChild('editFamilyID') editFamilyID: ElementRef;
  @ViewChild('editFamilyName') editFamilyName: ElementRef;
  @ViewChild('editFamilyDescription') editFamilyDescription: ElementRef;

  constructor(private userService: UserService, private treeService: FamilyTreeService) { }

  user: User;
  familyTrees: FamilyTree[];
  selectedTree: FamilyTree = {
    id:0,
    name: '',
    description: '',
    members:[],
    user:null
  };
  newFamilyHidden: Boolean = true;
  editFormHidden: Boolean = true;

  ngOnInit(): void {
    if (localStorage.getItem('user')==null) {
      location.href="";
    }
    var retrievedObject = localStorage.getItem('user');
    this.user = JSON.parse(retrievedObject);
    this.selectedTree = new FamilyTree();
    this.selectedTree.id = 0;
    localStorage.setItem('selectedTree', JSON.stringify(this.selectedTree));
    this.getAllMyTrees();
  }

  hideAll(): void {
    this.newFamilyHidden = true;
    this.editFormHidden = true;
  }

  getAllMyTrees() {
    this.userService.getAllMy().subscribe(
      (res: FamilyTree[]) => {
        this.familyTrees = res;
      },
      err=>{
        console.log(err);
        alert('Something went wrond');
      }
    );
  }

  sendNewFamilyTree(): void {
    let ft: FamilyTree = new FamilyTree();
    ft.name = this.newFamilyName.nativeElement.value;
    ft.description = this.newFamilyDescription.nativeElement.value;
    this.treeService.addNewFamilyTree(ft).subscribe(
      (res: FamilyTree)=> {
        this.newFamilyHidden = true;
        this.newFamilyName.nativeElement.value = "";
        this.newFamilyDescription.nativeElement.value = "";
        this.getAllMyTrees();
      },
      err=> {
        console.log(err);
        alert('Something went wrong');
      }
    );
  }

  sendEditFamilyTree(): void {
    let ft: FamilyTree = new FamilyTree();
    ft.id = this.editFamilyID.nativeElement.value;
    ft.name = this.editFamilyName.nativeElement.value;
    ft.description = this.editFamilyDescription.nativeElement.value;
    this.treeService.editFamilyTree(ft).subscribe(
      (res: FamilyTree) => {
        this.editFormHidden = true;
        this.editFamilyID.nativeElement.value = "";
        this.editFamilyName.nativeElement.value = "";
        this.editFamilyDescription.nativeElement.value = "";
        this.getAllMyTrees();
      },
      err=> {
        console.log(err);
        alert('Something went wrong');
      }
    );
  }

  delete(tree: FamilyTree): void {
    this.treeService.deleteFamilyTree(tree.id).subscribe(
      res=>{
        if(this.selectedTree.id == tree.id) {
          this.selectedTree = new FamilyTree();
          this.selectedTree.id = 0;
          localStorage.setItem('selectedTree', JSON.stringify(this.selectedTree));
        }
        this.getAllMyTrees();
      },
      err=> {
        console.log(err);
        alert('Something went wrong');
      }
    );
  }

  deleteAll(): void {
    this.treeService.deleteAll().subscribe(
      res=>{
        this.selectedTree = new FamilyTree();
        this.selectedTree.id = 0;
        localStorage.setItem('selectedTree', JSON.stringify(this.selectedTree));
        this.getAllMyTrees();
      },
      err=> {
        console.log(err);
        alert('Something went wrong');
      }
    );
  }

  edit(tree: FamilyTree): void {
    this.hideAll();
    this.editFormHidden = false;
    this.editFamilyName.nativeElement.value = tree.name;
    this.editFamilyDescription.nativeElement.value = tree.description;
    this.editFamilyID.nativeElement.value = tree.id;
  } 

  select(tree: FamilyTree): void {
    this.selectedTree = tree;
    localStorage.setItem('selectedTree', JSON.stringify(this.selectedTree));
  }

  diselect(): void {
    this.selectedTree = new FamilyTree();
    this.selectedTree.id = 0;
    localStorage.setItem('selectedTree', JSON.stringify(this.selectedTree));
  }
  
  addNew(): void {
    this.hideAll();
    this.newFamilyHidden = false;
  }

  closeAddNew(): void {
    this.newFamilyHidden = true;
    this.newFamilyName.nativeElement.value = "";
    this.newFamilyDescription.nativeElement.value = "";
  }

  closeEdit(): void {
    this.editFormHidden = true;
    this.editFamilyID.nativeElement.value = "";
    this.editFamilyName.nativeElement.value = "";
    this.editFamilyDescription.nativeElement.value = "";
  }

}
