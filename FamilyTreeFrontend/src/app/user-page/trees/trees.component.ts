import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_model/user';
import { UserService } from 'src/app/_services/user-service';
import { FamilyTree } from 'src/app/_model/family-tree';

@Component({
  selector: 'app-trees',
  templateUrl: './trees.component.html',
  styleUrls: ['./trees.component.css']
})
export class TreesComponent implements OnInit {

  constructor(private service: UserService) { }

  user: User;
  familyTrees: FamilyTree[];
  selectedTree: FamilyTree;

  ngOnInit(): void {
    if (localStorage.getItem('user')==null) {
      location.href="";
    }
    var retrievedObject = localStorage.getItem('user');
    this.user = JSON.parse(retrievedObject);
    this.service.getAllMy().subscribe(
      (res: FamilyTree[]) => {
        this.familyTrees = res;
        this.selectedTree = new FamilyTree();
      },
      err=>{
        alert('Something went wrond');
      }
    );
  }

  select(tree: FamilyTree): void {
    this.selectedTree = tree;
    alert(this.selectedTree.name);
  }

}
