# == Schema Information
#
# Table name: tracks
#
#  id                 :integer          not null, primary key
#  title              :string           not null
#  user_id            :integer          not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  song_file_name     :string
#  song_content_type  :string
#  song_file_size     :integer
#  song_updated_at    :datetime
#

class Track < ApplicationRecord
  validates :title, presence: true

  has_attached_file :image, default_url: "default.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  has_attached_file :song, default_url: "Rick.mp3"
  validates_attachment_content_type :song, content_type: ["audio/mpeg", "audio/mp3"]

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: 'User'
end