class Entry < ActiveRecord::Base
  belongs_to :blog
  has_many :user_stars, dependent: :destroy
  has_many :starred_by, through: :user_stars, source: :user
  has_many :users, through: :blog
  
end