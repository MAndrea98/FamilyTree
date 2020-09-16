insert into user_entity (username, password, email) values ('user', 'user', 'user@user.com');

insert into family_tree (name, description, user_id) values ('Royal family', 'The British Royal Family', 1);

insert into person (family_tree_id, id_in_family_tree, name, gender, date, title, image) values (1, 1, 'King George VI', 0, '1895-1952', 'King of the United Kingdom and the Dominions of the British Commonwealth', 'https://cdn.balkan.app/shared/f1.png');
insert into person (family_tree_id, id_in_family_tree, name, gender, date, title, image, spouse_id) values (1, 2, 'Queen Elizabeth', 1, '1900-2002', 'Queen Mother', 'https://cdn.balkan.app/shared/f2.png', 1);
insert into person (family_tree_id, id_in_family_tree, name, gender, date, title, image, father_id, mother_id) values (1, 3, 'Queen Elizabeth II', 1, '1926-', 'Queen of the United Kingdom and 15 other Commonwealth realms', 'https://cdn.balkan.app/shared/f5.png', 1, 2);
insert into person (family_tree_id, id_in_family_tree, name, gender, date, title, image, spouse_id) values (1, 4,'Prince Philip', 0, '1921-', 'Duke of Edinburgh ', 'https://cdn.balkan.app/shared/f3.png', 3);
insert into person (family_tree_id, id_in_family_tree, name, gender, date, title, image, father_id, mother_id) values (1, 5,'Princess Margareth', 1, '1930-2002', 'Countess of Snowdon', 'https://cdn.balkan.app/shared/f6.png', 1, 2);
insert into person (family_tree_id, id_in_family_tree, name, gender, date, title, image, father_id, mother_id) values (1, 6, 'Charles',            0, '1948-',     'Price of Wales',      'https://cdn.balkan.app/shared/f8.png', 3, 4);
insert into person (family_tree_id, id_in_family_tree, name, gender, date, title, image, spouse_id) values (1, 7, 'Diana', 1, '1960-1997', 'Princess of Wales', 'https://cdn.balkan.app/shared/f9.png', 6);
insert into person (family_tree_id, id_in_family_tree,name, gender, date, title, image, spouse_id) values (1,8,'Camilla', 1, '1947-', 'Duchess of Cornwall', 'https://cdn.balkan.app/shared/f7.png', 6);
insert into person (family_tree_id, id_in_family_tree,name, gender, date, title, image, father_id, mother_id) values (1,9,'Anne', 1, '1950-', 'Princess Royal', 'https://cdn.balkan.app/shared/f10.png', 4, 3);
insert into person (family_tree_id, id_in_family_tree,name, gender, date, title, image, father_id, mother_id) values (1,10,'Prince Andrew', 0, '1960-', 'Duke of York', 'https://cdn.balkan.app/shared/f11.png', 4, 3);
insert into person (family_tree_id, id_in_family_tree,name, gender, date, title, image, father_id, mother_id) values (1,11,'Prince Edward', 0, '1964-', 'Earl of Wessex', 'https://cdn.balkan.app/shared/f12.png', 4, 3);
insert into person (family_tree_id, id_in_family_tree,name, gender, date, title, image, father_id, mother_id) values (1,12,'Prince William', 0, '1982-', 'Duch of Cambridge', 'https://cdn.balkan.app/shared/f14.png', 6, 7);
insert into person (family_tree_id, id_in_family_tree,name, gender, date, title, image, father_id, mother_id) values (1,13,'Prince Harry', 0, '1984-', 'Duke of Sussex', 'https://cdn.balkan.app/shared/f15.png', 6, 7);
insert into person (family_tree_id, id_in_family_tree,name, gender, date, title, image, spouse_id) values (1,14,'Catherine', 1, '1982-', 'Duchess of Cambridge', 'https://cdn.balkan.app/shared/f13.png', 12);
insert into person (family_tree_id, id_in_family_tree,name, gender, date, title, image, spouse_id) values (1,15,'Meghan', 1, '1981-', 'Duchess of Sussex', 'https://cdn.balkan.app/shared/f16.png', 13);
insert into person (family_tree_id, id_in_family_tree,name, gender, date, title, image, father_id, mother_id) values (1,16,'Prince George of Cambridge', 0, '2013-', '', 'https://cdn.balkan.app/shared/f17.png', 12, 14);
insert into person (family_tree_id, id_in_family_tree,name, gender, date, title, image, father_id, mother_id) values (1,17,'Prince Charlotte of Cambridge', 1, '2015-', '', 'https://cdn.balkan.app/shared/f18.png', 12, 14);
insert into person (family_tree_id, id_in_family_tree,name, gender, date, title, image, father_id, mother_id) values (1,18,'Prince Louis of Cambridge', 0, '2018-', '', 'https://cdn.balkan.app/shared/f19.png', 12, 14);
insert into person (family_tree_id, id_in_family_tree,name, gender, date, title, image, father_id, mother_id) values (1,19,'Archie Mountbatten-Windsor', 0, '2019-', '', '', 13, 15);
insert into person (family_tree_id, id_in_family_tree,name, gender, date, title, image, spouse_id) values (1,20,'Mark Phillips', 0, '1948-', '', '', 9);
insert into person (family_tree_id, id_in_family_tree,name, gender, date, title, image, spouse_id) values (1,21,'Timothy Laurence', 0, '1955-', '', '', 9);
insert into person (family_tree_id, id_in_family_tree,name, gender, date, title, image, father_id, mother_id) values (1,22,'Peter Phillips', 0, '1977-', '', '', 21, 9);
insert into person (family_tree_id, id_in_family_tree,name, gender, date, title, image, father_id, mother_id) values (1,23,'Zara Tindall', 1, '1981-', '', '', 21, 9);

