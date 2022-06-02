import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property-page',
  templateUrl: './property-page.component.html',
  styleUrls: ['./property-page.component.css', 'placeholder-anime.css']
})
export class PropertyPageComponent implements OnInit {

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private propertyService: PropertyService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.checkUser()
    this.titleService.setTitle('Onebrick - Properties')
    this.getAll(1, this.totalLimit)
  }

  public totalLimit = 9

  public currentPage!: number

  public animatedBg: boolean = true

  public data: any

  public properties: any

  public propertyData: any

  public propertyImage: any

  public propertyId!: string

  public message = ''

  public status = {
    available: 'available',
    taken: 'soldOut'
  }

  public defaultStatus: any

  private role: string = this.authService.getUserRole()

  public postPreview: any

  public checkUser(): boolean {
    const roles = ['facilitator', 'admin']
    if (!roles.includes(this.role)) {
      this.router.navigate(['dashboard', 'overview'])
      return false
    } else {
      return true
    }
  }

  public doUpdateState(): void {
    this.updateBody.status = this.defaultStatus
  }

  public selectPostFile(evt: any) {
    if (evt.target.files) {
      const reader = new FileReader()
      reader.readAsDataURL(evt.target.files[0])
      reader.onload = (event) => { this.postPreview = event.target?.result }
    }
  }

  public selectUpdateFile(evt: any) {
    if (evt.target.files) {
      const reader = new FileReader()
      reader.readAsDataURL(evt.target.files[0])
      reader.onload = (event) => { this.propertyImage = event.target?.result }
    }
  }

  public updateBody = {
    name: "",
    image: "",
    location: "",
    yearBuilt: "",
    size: "",
    description: "",
    totalUnits: "",
    unitsAvailable: "",
    costPerUnit: "",
    status: "",
    ROIEstimate: "",
  }

  public postBody = {
    name: "",
    image: "",
    location: "",
    yearBuilt: "",
    size: "",
    description: "",
    totalUnits: "",
    unitsAvailable: "",
    costPerUnit: "",
    ROIEstimate: "",
  }

  private sendMsg(msg: string) {
    this.message = msg
    setTimeout(() => { this.message = '' }, 4000)
  }

  public getParamsFromChild(value: any) {
    const { page, limit } = value
    this.currentPage = page
    this.getAll(page, limit)
  }

  public getPropertyId(id: string) {
    this.propertyImage = ''
    this.propertyId = id
    this.propertyService.getPropertiesById(id)
      .then(response => {
        this.propertyData = response.data
        this.propertyImage = `assets/images/${this.propertyData.image}`
        this.assignValues()
      })
  }

  private getAll(page: number, limit: number) {
    this.propertyService.getAllProperties(page, limit)
      .then(response => {
        this.properties = response.data.results
        response.data['totalLimit'] = this.totalLimit
        this.data = response.data
        this.animatedBg = false
      })
  }

  private assignValues() {
    this.updateBody.name = this.propertyData.name
    this.updateBody.image = this.propertyData.image
    this.updateBody.location = this.propertyData.location
    this.updateBody.yearBuilt = this.propertyData.yearBuilt
    this.updateBody.size = this.propertyData.size
    this.updateBody.description = this.propertyData.description
    this.updateBody.totalUnits = this.propertyData.totalUnits
    this.updateBody.unitsAvailable = this.propertyData.unitsAvailable
    this.updateBody.costPerUnit = this.propertyData.costPerUnit
    this.updateBody.status = this.propertyData.status
    this.updateBody.ROIEstimate = this.propertyData.ROIEstimate
    this.defaultStatus = this.propertyData.status
  }

  public makePublic() {
    this.propertyService.updateProperty(this.propertyId, { isPrivate: false })
      .then(() => {
        this.getAll(this.currentPage || 1, this.totalLimit)
        this.getPropertyId(this.propertyId)
      })
  }

  public makePrivate() {
    this.propertyService.updateProperty(this.propertyId, { isPrivate: true })
      .then(() => {
        this.getAll(this.currentPage || 1, this.totalLimit)
        this.getPropertyId(this.propertyId)
      })
  }

  public deleteProperty() {
    this.propertyService.deletePropertyById(this.propertyId)
      .then(() => {
        this.animatedBg = true
        this.getAll(this.currentPage || 1, this.totalLimit)
      })
  }

  public sameCreateUser() {
    if (this.authService.getCurrentUserId() === this.propertyData.createdBy.id) {
      return true
    } else {
      return false
    }
  }

  public sameUpdateUser() {
    if (this.authService.getCurrentUserId() === this.propertyData.updatedBy.id) {
      return true
    } else {
      return false
    }
  }

  public makeUpdate(id: string) {
    const formData = this.handleForms(this.updateBody)
    this.propertyService.updateProperty(id, formData)
      .then(() => {
        this.sendMsg('Property updated successfully')
        this.getAll(this.currentPage || 1, this.totalLimit)
        this.getPropertyId(this.propertyId)
      }).catch(err => this.sendMsg(err.error.message))
  }

  private handleForms(body: any) {
    const formData = new FormData()
    formData.append('image', body.image)
    formData.append('name', body.name)
    formData.append('location', body.location)
    formData.append('yearBuilt', body.yearBuilt)
    formData.append('size', body.size)
    formData.append('description', body.description)
    formData.append('totalUnits', body.totalUnits)
    formData.append('unitsAvailable', body.unitsAvailable)
    formData.append('costPerUnit', body.costPerUnit)
    formData.append('ROIEstimate', body.ROIEstimate)
    if (body.status) formData.append('status', body.status)
    return formData
  }

  private clearFields() {
    this.postBody.name = ""
    this.postBody.image = ""
    this.postBody.location = ""
    this.postBody.yearBuilt = ""
    this.postBody.size = ""
    this.postBody.description = ""
    this.postBody.totalUnits = ""
    this.postBody.unitsAvailable = ""
    this.postBody.costPerUnit = ""
    this.postBody.ROIEstimate = ""
  }

  public createNew() {
    const { name, image, location, yearBuilt, size,
      description, totalUnits, unitsAvailable,
      costPerUnit, ROIEstimate } = this.postBody
    if (!name || !image || !location
      || !yearBuilt || !size || !description
      || !totalUnits || !unitsAvailable
      || !costPerUnit || !ROIEstimate) {
      this.sendMsg('Please, fill all fields')
    } else {
      const formData = this.handleForms(this.postBody)
      this.propertyService.createProperty(formData)
        .then(() => {
          this.sendMsg('Property created successfully')
          this.clearFields()
          this.postPreview = ''
          this.getAll(this.currentPage || 1, this.totalLimit)
        }).catch(err => this.sendMsg(err.error.message))
    }
  }

  public postImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.postBody.image = file
    }
  }

  public updateImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.updateBody.image = file
    }
  }

  public checkSuper(): boolean {
    if (this.role !== 'facilitator') {
      return false
    } else {
      return true
    }
  }
}
